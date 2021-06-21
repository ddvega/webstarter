"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const session_1 = require("../session");
const assert_1 = require("../utils/assert");
/**
 * @ignore
 */
function profileHandler(getClient, getAccessToken, sessionCache) {
    return (req, res, options) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        assert_1.assertReqRes(req, res);
        if (!sessionCache.isAuthenticated(req, res)) {
            res.status(401).json({
                error: 'not_authenticated',
                description: 'The user does not have an active session or is not authenticated'
            });
            return;
        }
        const session = sessionCache.get(req, res);
        res.setHeader('Cache-Control', 'no-store');
        if (options === null || options === void 0 ? void 0 : options.refetch) {
            const { accessToken } = yield getAccessToken(req, res);
            if (!accessToken) {
                throw new Error('No access token available to refetch the profile');
            }
            const client = yield getClient();
            const userInfo = yield client.userinfo(accessToken);
            let newSession = session_1.fromJson(Object.assign(Object.assign({}, session), { user: Object.assign(Object.assign({}, session.user), userInfo) }));
            if (options.afterRefetch) {
                newSession = yield options.afterRefetch(req, res, newSession);
            }
            sessionCache.set(req, res, newSession);
            res.json(newSession.user);
            return;
        }
        res.json(session.user);
    });
}
exports.default = profileHandler;
//# sourceMappingURL=profile.js.map