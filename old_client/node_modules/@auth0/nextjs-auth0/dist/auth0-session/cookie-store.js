"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = require("assert");
const jose_1 = require("jose");
const hkdf_1 = require("./utils/hkdf");
const debug_1 = tslib_1.__importDefault(require("./utils/debug"));
const cookies_1 = require("./utils/cookies");
const cookie_1 = require("cookie");
const debug = debug_1.default('cookie-store');
const epoch = () => (Date.now() / 1000) | 0; // eslint-disable-line no-bitwise
const MAX_COOKIE_SIZE = 4096;
const alg = 'dir';
const enc = 'A256GCM';
const notNull = (value) => value !== null;
class CookieStore {
    constructor(config) {
        this.config = config;
        const secrets = Array.isArray(config.secret) ? config.secret : [config.secret];
        this.keystore = new jose_1.JWKS.KeyStore();
        secrets.forEach((secretString, i) => {
            const key = jose_1.JWK.asKey(hkdf_1.encryption(secretString));
            if (i === 0) {
                this.currentKey = key;
            }
            this.keystore.add(key);
        });
        const _a = this.config.session, _b = _a.cookie, { transient } = _b, cookieConfig = tslib_1.__rest(_b, ["transient"]), { name: sessionName } = _a;
        const cookieOptions = Object.assign({}, cookieConfig);
        if (!transient) {
            cookieOptions.expires = new Date();
        }
        const emptyCookie = cookie_1.serialize(`${sessionName}.0`, '', cookieOptions);
        this.chunkSize = MAX_COOKIE_SIZE - emptyCookie.length;
    }
    encrypt(payload, headers) {
        return jose_1.JWE.encrypt(payload, this.currentKey, Object.assign({ alg,
            enc }, headers));
    }
    decrypt(jwe) {
        return jose_1.JWE.decrypt(jwe, this.keystore, {
            complete: true,
            contentEncryptionAlgorithms: [enc],
            keyManagementAlgorithms: [alg]
        });
    }
    calculateExp(iat, uat) {
        const { absoluteDuration } = this.config.session;
        const { rolling, rollingDuration } = this.config.session;
        if (typeof absoluteDuration !== 'number') {
            return uat + rollingDuration;
        }
        if (!rolling) {
            return iat + absoluteDuration;
        }
        return Math.min(uat + rollingDuration, iat + absoluteDuration);
    }
    read(req) {
        const cookies = cookies_1.getAll(req);
        const { name: sessionName, rollingDuration, absoluteDuration } = this.config.session;
        let iat;
        let uat;
        let exp;
        let existingSessionValue;
        try {
            if (sessionName in cookies) {
                // get JWE from unchunked session cookie
                debug('reading session from %s cookie', sessionName);
                existingSessionValue = cookies[sessionName];
            }
            else if (`${sessionName}.0` in cookies) {
                // get JWE from chunked session cookie
                // iterate all cookie names
                // match and filter for the ones that match sessionName.<number>
                // sort by chunk index
                // concat
                existingSessionValue = Object.entries(cookies)
                    .map(([cookie, value]) => {
                    const match = cookie.match(`^${sessionName}\\.(\\d+)$`);
                    if (match) {
                        return [match[1], value];
                    }
                    return null;
                })
                    .filter(notNull)
                    .sort(([a], [b]) => {
                    return parseInt(a, 10) - parseInt(b, 10);
                })
                    .map(([i, chunk]) => {
                    debug('reading session chunk from %s.%d cookie', sessionName, i);
                    return chunk;
                })
                    .join('');
            }
            if (existingSessionValue) {
                const { protected: header, cleartext } = this.decrypt(existingSessionValue);
                ({ iat, uat, exp } = header);
                // check that the existing session isn't expired based on options when it was established
                assert_1.strict(exp > epoch(), 'it is expired based on options when it was established');
                // check that the existing session isn't expired based on current rollingDuration rules
                if (rollingDuration) {
                    assert_1.strict(uat + rollingDuration > epoch(), 'it is expired based on current rollingDuration rules');
                }
                // check that the existing session isn't expired based on current absoluteDuration rules
                if (typeof absoluteDuration === 'number') {
                    assert_1.strict(iat + absoluteDuration > epoch(), 'it is expired based on current absoluteDuration rules');
                }
                return [JSON.parse(cleartext.toString()), iat];
            }
        }
        catch (err) {
            /* istanbul ignore else */
            if (err instanceof assert_1.AssertionError) {
                debug('existing session was rejected because', err.message);
            }
            else if (err instanceof jose_1.errors.JOSEError) {
                debug('existing session was rejected because it could not be decrypted', err);
            }
            else {
                debug('unexpected error handling session', err);
            }
        }
        return [];
    }
    save(req, res, session, createdAt) {
        const _a = this.config.session, _b = _a.cookie, { transient } = _b, cookieConfig = tslib_1.__rest(_b, ["transient"]), { name: sessionName } = _a;
        const cookies = cookies_1.getAll(req);
        if (!session) {
            debug('clearing all matching session cookies');
            for (const cookieName of Object.keys(cookies)) {
                if (cookieName.match(`^${sessionName}(?:\\.\\d)?$`)) {
                    cookies_1.clear(res, cookieName, {
                        domain: cookieConfig.domain,
                        path: cookieConfig.path
                    });
                }
            }
            return;
        }
        const uat = epoch();
        const iat = typeof createdAt === 'number' ? createdAt : uat;
        const exp = this.calculateExp(iat, uat);
        const cookieOptions = Object.assign({}, cookieConfig);
        if (!transient) {
            cookieOptions.expires = new Date(exp * 1000);
        }
        debug('found session, creating signed session cookie(s) with name %o(.i)', sessionName);
        const value = this.encrypt(JSON.stringify(session), { iat, uat, exp });
        const chunkCount = Math.ceil(value.length / this.chunkSize);
        if (chunkCount > 1) {
            debug('cookie size greater than %d, chunking', this.chunkSize);
            for (let i = 0; i < chunkCount; i++) {
                const chunkValue = value.slice(i * this.chunkSize, (i + 1) * this.chunkSize);
                const chunkCookieName = `${sessionName}.${i}`;
                cookies_1.set(res, chunkCookieName, chunkValue, cookieOptions);
            }
            if (sessionName in cookies) {
                cookies_1.clear(res, sessionName, {
                    domain: cookieConfig.domain,
                    path: cookieConfig.path
                });
            }
        }
        else {
            cookies_1.set(res, sessionName, value, cookieOptions);
            for (const cookieName of Object.keys(cookies)) {
                if (cookieName.match(`^${sessionName}\\.\\d$`)) {
                    cookies_1.clear(res, cookieName, {
                        domain: cookieConfig.domain,
                        path: cookieConfig.path
                    });
                }
            }
        }
    }
}
exports.default = CookieStore;
//# sourceMappingURL=cookie-store.js.map