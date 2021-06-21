"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../utils/errors");
const array_1 = require("../utils/array");
const session_1 = require("../session");
/**
 * @ignore
 */
function accessTokenFactory(config, getClient, sessionCache) {
    return (req, res, accessTokenRequest) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const session = sessionCache.get(req, res);
        if (!session) {
            throw new errors_1.AccessTokenError('invalid_session', 'The user does not have a valid session.');
        }
        if (!session.accessToken && !session.refreshToken) {
            throw new errors_1.AccessTokenError('invalid_session', 'The user does not have a valid access token.');
        }
        if (!session.accessTokenExpiresAt) {
            throw new errors_1.AccessTokenError('access_token_expired', 'Expiration information for the access token is not available. The user will need to sign in again.');
        }
        if (accessTokenRequest && accessTokenRequest.scopes) {
            const persistedScopes = session.accessTokenScope;
            if (!persistedScopes || persistedScopes.length === 0) {
                throw new errors_1.AccessTokenError('insufficient_scope', 'An access token with the requested scopes could not be provided. The user will need to sign in again.');
            }
            const matchingScopes = array_1.intersect(accessTokenRequest.scopes, persistedScopes.split(' '));
            if (!array_1.match(accessTokenRequest.scopes, [...matchingScopes])) {
                throw new errors_1.AccessTokenError('insufficient_scope', `Could not retrieve an access token with scopes "${accessTokenRequest.scopes.join(' ')}". The user will need to sign in again.`);
            }
        }
        // Check if the token has expired.
        // There is an edge case where we might have some clock skew where our code assumes the token is still valid.
        // Adding a skew of 1 minute to compensate.
        if (!session.refreshToken && session.accessTokenExpiresAt * 1000 - 60000 < Date.now()) {
            throw new errors_1.AccessTokenError('access_token_expired', 'The access token expired and a refresh token is not available. The user will need to sign in again.');
        }
        // Check if the token has expired.
        // There is an edge case where we might have some clock skew where our code assumes the token is still valid.
        // Adding a skew of 1 minute to compensate.
        if ((session.refreshToken && session.accessTokenExpiresAt * 1000 - 60000 < Date.now()) ||
            (session.refreshToken && accessTokenRequest && accessTokenRequest.refresh)) {
            const client = yield getClient();
            const tokenSet = yield client.refresh(session.refreshToken);
            // Update the session.
            const newSession = session_1.fromTokenSet(tokenSet, config);
            Object.assign(session, Object.assign(Object.assign({}, newSession), { refreshToken: newSession.refreshToken || session.refreshToken, user: Object.assign(Object.assign({}, session.user), newSession.user) }));
            // Return the new access token.
            return {
                accessToken: tokenSet.access_token
            };
        }
        // We don't have an access token.
        if (!session.accessToken) {
            throw new errors_1.AccessTokenError('invalid_session', 'The user does not have a valid access token.');
        }
        // The access token is not expired and has sufficient scopes;
        return {
            accessToken: session.accessToken
        };
    });
}
exports.default = accessTokenFactory;
//# sourceMappingURL=get-access-token.js.map