"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const on_headers_1 = tslib_1.__importDefault(require("on-headers"));
const session_1 = require("./session");
class SessionCache {
    constructor(config, cookieStore) {
        this.config = config;
        this.cookieStore = cookieStore;
        this.cache = new WeakMap();
    }
    init(req, res) {
        if (!this.cache.has(req)) {
            const [json, iat] = this.cookieStore.read(req);
            this.cache.set(req, session_1.fromJson(json));
            on_headers_1.default(res, () => this.cookieStore.save(req, res, this.cache.get(req), iat));
        }
    }
    create(req, res, session) {
        this.cache.set(req, session);
        on_headers_1.default(res, () => this.cookieStore.save(req, res, this.cache.get(req)));
    }
    delete(req, res) {
        this.init(req, res);
        this.cache.set(req, null);
    }
    isAuthenticated(req, res) {
        this.init(req, res);
        const session = this.cache.get(req);
        return !!(session === null || session === void 0 ? void 0 : session.user);
    }
    getIdToken(req, res) {
        this.init(req, res);
        const session = this.cache.get(req);
        return session === null || session === void 0 ? void 0 : session.idToken;
    }
    set(req, res, session) {
        this.init(req, res);
        this.cache.set(req, session);
    }
    get(req, res) {
        this.init(req, res);
        return this.cache.get(req);
    }
    fromTokenSet(tokenSet) {
        return session_1.fromTokenSet(tokenSet, this.config);
    }
}
exports.default = SessionCache;
//# sourceMappingURL=cache.js.map