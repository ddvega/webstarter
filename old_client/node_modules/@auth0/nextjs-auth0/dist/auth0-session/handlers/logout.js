"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const url_1 = tslib_1.__importDefault(require("url"));
const url_join_1 = tslib_1.__importDefault(require("url-join"));
const debug_1 = tslib_1.__importDefault(require("../utils/debug"));
const debug = debug_1.default('logout');
function logoutHandlerFactory(config, getClient, sessionCache) {
    return (req, res, options = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let returnURL = options.returnTo || config.routes.postLogoutRedirect;
        debug('logout() with return url: %s', returnURL);
        if (url_1.default.parse(returnURL).host === null) {
            returnURL = url_join_1.default(config.baseURL, returnURL);
        }
        if (!sessionCache.isAuthenticated(req, res)) {
            debug('end-user already logged out, redirecting to %s', returnURL);
            res.writeHead(302, {
                Location: returnURL
            });
            res.end();
            return;
        }
        const idToken = sessionCache.getIdToken(req, res);
        sessionCache.delete(req, res);
        if (!config.idpLogout) {
            debug('performing a local only logout, redirecting to %s', returnURL);
            res.writeHead(302, {
                Location: returnURL
            });
            res.end();
            return;
        }
        const client = yield getClient();
        returnURL = client.endSessionUrl({
            post_logout_redirect_uri: returnURL,
            id_token_hint: idToken
        });
        debug('logging out of identity provider, redirecting to %s', returnURL);
        res.writeHead(302, {
            Location: returnURL
        });
        res.end();
    });
}
exports.default = logoutHandlerFactory;
//# sourceMappingURL=logout.js.map