"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJson = exports.fromTokenSet = void 0;
const tslib_1 = require("tslib");
/**
 * The user's session
 *
 * @category Server
 */
class Session {
    constructor(user) {
        this.user = user;
    }
}
exports.default = Session;
/**
 * @ignore
 */
function fromTokenSet(tokenSet, config) {
    // Get the claims without any OIDC specific claim.
    const claims = tokenSet.claims();
    config.identityClaimFilter.forEach((claim) => {
        delete claims[claim];
    });
    const { id_token, access_token, scope, expires_at, refresh_token } = tokenSet, remainder = tslib_1.__rest(tokenSet, ["id_token", "access_token", "scope", "expires_at", "refresh_token"]);
    return Object.assign(new Session(Object.assign({}, claims)), {
        idToken: id_token,
        accessToken: access_token,
        accessTokenScope: scope,
        accessTokenExpiresAt: expires_at,
        refreshToken: refresh_token
    }, remainder);
}
exports.fromTokenSet = fromTokenSet;
/**
 * @ignore
 */
function fromJson(json) {
    if (!json) {
        return null;
    }
    return Object.assign(new Session(Object.assign({}, json.user)), json);
}
exports.fromJson = fromJson;
//# sourceMappingURL=session.js.map