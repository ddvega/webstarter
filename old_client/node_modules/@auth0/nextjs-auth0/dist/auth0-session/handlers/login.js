"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const url_join_1 = tslib_1.__importDefault(require("url-join"));
const assert_1 = require("assert");
const get_login_state_1 = require("../hooks/get-login-state");
const debug_1 = tslib_1.__importDefault(require("../utils/debug"));
const debug = debug_1.default('handlers');
function getRedirectUri(config) {
    return url_join_1.default(config.baseURL, config.routes.callback);
}
function loginHandlerFactory(config, getClient, transientHandler) {
    return (req, res, options = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const client = yield getClient();
        const returnTo = options.returnTo || config.baseURL;
        const opts = Object.assign({ returnTo, getLoginState: config.getLoginState }, options);
        // Ensure a redirect_uri, merge in configuration options, then passed-in options.
        opts.authorizationParams = Object.assign(Object.assign({ redirect_uri: getRedirectUri(config) }, config.authorizationParams), (opts.authorizationParams || {}));
        const transientOpts = {
            sameSite: opts.authorizationParams.response_mode === 'form_post' ? 'none' : 'lax'
        };
        const stateValue = yield opts.getLoginState(req, opts);
        if (typeof stateValue !== 'object') {
            throw new Error('Custom state value must be an object.');
        }
        stateValue.nonce = transientHandler.generateNonce();
        stateValue.returnTo = stateValue.returnTo || opts.returnTo;
        const usePKCE = opts.authorizationParams.response_type.includes('code');
        if (usePKCE) {
            debug('response_type includes code, the authorization request will use PKCE');
            stateValue.code_verifier = transientHandler.generateCodeVerifier();
        }
        const authParams = Object.assign(Object.assign(Object.assign({}, opts.authorizationParams), { nonce: transientHandler.save('nonce', req, res, transientOpts), state: transientHandler.save('state', req, res, Object.assign(Object.assign({}, transientOpts), { value: get_login_state_1.encodeState(stateValue) })) }), (usePKCE
            ? {
                code_challenge: transientHandler.calculateCodeChallenge(transientHandler.save('code_verifier', req, res, transientOpts)),
                code_challenge_method: 'S256'
            }
            : undefined));
        const validResponseTypes = ['id_token', 'code id_token', 'code'];
        assert_1.strict(validResponseTypes.includes(authParams.response_type), `response_type should be one of ${validResponseTypes.join(', ')}`);
        assert_1.strict(/\bopenid\b/.test(authParams.scope), 'scope should contain "openid"');
        if (authParams.max_age) {
            transientHandler.save('max_age', req, res, Object.assign(Object.assign({}, transientOpts), { value: authParams.max_age.toString() }));
        }
        const authorizationUrl = client.authorizationUrl(authParams);
        debug('redirecting to %s', authorizationUrl);
        res.writeHead(302, {
            Location: authorizationUrl
        });
        res.end();
    });
}
exports.default = loginHandlerFactory;
//# sourceMappingURL=login.js.map