"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * @ignore
 */
const wrapErrorHandling = (fn) => (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fn(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
    }
});
/**
 * @ignore
 */
function handlerFactory({ handleLogin, handleLogout, handleCallback, handleProfile }) {
    return (userHandlers = {}) => {
        const { login, logout, callback, profile } = Object.assign({ login: wrapErrorHandling(handleLogin), logout: wrapErrorHandling(handleLogout), callback: wrapErrorHandling(handleCallback), profile: wrapErrorHandling(handleProfile) }, userHandlers);
        return (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let { query: { auth0: route } } = req;
            route = Array.isArray(route) ? route[0] : route;
            switch (route) {
                case 'login':
                    return login(req, res);
                case 'logout':
                    return logout(req, res);
                case 'callback':
                    return callback(req, res);
                case 'me':
                    return profile(req, res);
                default:
                    res.status(404).end();
            }
        });
    };
}
exports.default = handlerFactory;
//# sourceMappingURL=auth.js.map