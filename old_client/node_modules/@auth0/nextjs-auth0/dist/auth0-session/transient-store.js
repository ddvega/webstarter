"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCookieValue = void 0;
const openid_client_1 = require("openid-client");
const jose_1 = require("jose");
const hkdf_1 = require("./utils/hkdf");
const cookies_1 = require("./utils/cookies");
const header = { alg: 'HS256', b64: false, crit: ['b64'] };
const getPayload = (cookie, value) => Buffer.from(`${cookie}=${value}`);
const flattenedJWSFromCookie = (cookie, value, signature) => ({
    protected: Buffer.from(JSON.stringify(header))
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_'),
    payload: getPayload(cookie, value),
    signature
});
const generateSignature = (cookie, value, key) => {
    const payload = getPayload(cookie, value);
    return jose_1.JWS.sign.flattened(payload, key, header).signature;
};
const verifySignature = (cookie, value, signature, keystore) => {
    try {
        return !!jose_1.JWS.verify(flattenedJWSFromCookie(cookie, value, signature), keystore, {
            algorithms: ['HS256'],
            crit: ['b64']
        });
    }
    catch (err) {
        return false;
    }
};
const getCookieValue = (cookie, value, keystore) => {
    if (!value) {
        return undefined;
    }
    let signature;
    [value, signature] = value.split('.');
    if (verifySignature(cookie, value, signature, keystore)) {
        return value;
    }
    return undefined;
};
const generateCookieValue = (cookie, value, key) => {
    const signature = generateSignature(cookie, value, key);
    return `${value}.${signature}`;
};
exports.generateCookieValue = generateCookieValue;
class TransientStore {
    constructor(config) {
        this.config = config;
        let current;
        const secret = config.secret;
        const secrets = Array.isArray(secret) ? secret : [secret];
        const keystore = new jose_1.JWKS.KeyStore();
        secrets.forEach((secretString, i) => {
            const key = jose_1.JWK.asKey(hkdf_1.signing(secretString));
            if (i === 0) {
                current = key;
            }
            keystore.add(key);
        });
        this.currentKey = current;
        this.keyStore = keystore;
    }
    /**
     * Set a cookie with a value or a generated nonce.
     *
     * @param {String} key Cookie name to use.
     * @param {IncomingMessage} _req Server Request object.
     * @param {ServerResponse} res Server Response object.
     * @param {Object} opts Options object.
     * @param {String} opts.sameSite SameSite attribute of "None," "Lax," or "Strict". Default is "None."
     * @param {String} opts.value Cookie value. Omit this key to store a generated value.
     *
     * @return {String} Cookie value that was set.
     */
    save(key, _req, res, { sameSite = 'none', value = this.generateNonce() }) {
        const isSameSiteNone = sameSite === 'none';
        const { domain, path, secure } = this.config.session.cookie;
        const basicAttr = {
            httpOnly: true,
            secure,
            domain,
            path
        };
        {
            const cookieValue = exports.generateCookieValue(key, value, this.currentKey);
            // Set the cookie with the SameSite attribute and, if needed, the Secure flag.
            cookies_1.set(res, key, cookieValue, Object.assign(Object.assign({}, basicAttr), { sameSite, secure: isSameSiteNone ? true : basicAttr.secure }));
        }
        if (isSameSiteNone && this.config.legacySameSiteCookie) {
            const cookieValue = exports.generateCookieValue(`_${key}`, value, this.currentKey);
            // Set the fallback cookie with no SameSite or Secure attributes.
            cookies_1.set(res, `_${key}`, cookieValue, basicAttr);
        }
        return value;
    }
    /**
     * Get a cookie value then delete it.
     *
     * @param {String} key Cookie name to use.
     * @param {IncomingMessage} req Express Request object.
     * @param {ServerResponse} res Express Response object.
     *
     * @return {String|undefined} Cookie value or undefined if cookie was not found.
     */
    read(key, req, res) {
        const cookie = cookies_1.get(req, key);
        const { domain, path } = this.config.session.cookie;
        let value = getCookieValue(key, cookie, this.keyStore);
        cookies_1.clear(res, key, { domain, path });
        if (this.config.legacySameSiteCookie) {
            const fallbackKey = `_${key}`;
            if (!value) {
                const fallbackCookie = cookies_1.get(req, fallbackKey);
                value = getCookieValue(fallbackKey, fallbackCookie, this.keyStore);
            }
            cookies_1.clear(res, fallbackKey, { domain, path });
        }
        return value;
    }
    /**
     * Generates a nonce value.
     * @return {String}
     */
    generateNonce() {
        return openid_client_1.generators.nonce();
    }
    /**
     * Generates a code_verifier value.
     * @return {String}
     */
    generateCodeVerifier() {
        return openid_client_1.generators.codeVerifier();
    }
    /**
     * Calculates a code_challenge value for a given codeVerifier
     * @param {String} codeVerifier Code Verifier to calculate the code_challenge value from.
     * @return {String}
     */
    calculateCodeChallenge(codeVerifier) {
        return openid_client_1.generators.codeChallenge(codeVerifier);
    }
}
exports.default = TransientStore;
//# sourceMappingURL=transient-store.js.map