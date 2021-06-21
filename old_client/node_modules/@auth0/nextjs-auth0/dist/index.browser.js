"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuth = exports.handleProfile = exports.handleCallback = exports.handleLogout = exports.handleLogin = exports.withApiAuthRequired = exports.getAccessToken = exports.getSession = exports.initAuth0 = exports.withPageAuthRequired = exports.useUser = exports.UserContext = exports.UserProvider = void 0;
var frontend_1 = require("./frontend");
Object.defineProperty(exports, "UserProvider", { enumerable: true, get: function () { return frontend_1.UserProvider; } });
Object.defineProperty(exports, "UserContext", { enumerable: true, get: function () { return frontend_1.UserContext; } });
Object.defineProperty(exports, "useUser", { enumerable: true, get: function () { return frontend_1.useUser; } });
Object.defineProperty(exports, "withPageAuthRequired", { enumerable: true, get: function () { return frontend_1.withPageAuthRequired; } });
const serverSideOnly = (method) => `The ${method} method can only be used from the server side`;
const instance = {
    getSession() {
        throw new Error(serverSideOnly('getSession'));
    },
    getAccessToken() {
        throw new Error(serverSideOnly('getAccessToken'));
    },
    withApiAuthRequired() {
        throw new Error(serverSideOnly('withApiAuthRequired'));
    },
    handleLogin() {
        throw new Error(serverSideOnly('handleLogin'));
    },
    handleLogout() {
        throw new Error(serverSideOnly('handleLogout'));
    },
    handleCallback() {
        throw new Error(serverSideOnly('handleCallback'));
    },
    handleProfile() {
        throw new Error(serverSideOnly('handleProfile'));
    },
    handleAuth() {
        throw new Error(serverSideOnly('handleAuth'));
    },
    withPageAuthRequired() {
        throw new Error(serverSideOnly('withPageAuthRequired'));
    }
};
const initAuth0 = () => instance;
exports.initAuth0 = initAuth0;
const getSession = (...args) => instance.getSession(...args);
exports.getSession = getSession;
const getAccessToken = (...args) => instance.getAccessToken(...args);
exports.getAccessToken = getAccessToken;
const withApiAuthRequired = (...args) => instance.withApiAuthRequired(...args);
exports.withApiAuthRequired = withApiAuthRequired;
const handleLogin = (...args) => instance.handleLogin(...args);
exports.handleLogin = handleLogin;
const handleLogout = (...args) => instance.handleLogout(...args);
exports.handleLogout = handleLogout;
const handleCallback = (...args) => instance.handleCallback(...args);
exports.handleCallback = handleCallback;
const handleProfile = (...args) => instance.handleProfile(...args);
exports.handleProfile = handleProfile;
const handleAuth = (...args) => instance.handleAuth(...args);
exports.handleAuth = handleAuth;
//# sourceMappingURL=index.browser.js.map