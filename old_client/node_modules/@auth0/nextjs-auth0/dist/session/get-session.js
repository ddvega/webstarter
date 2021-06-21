"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @ignore
 */
function sessionFactory(sessionCache) {
    return (req, res) => {
        return sessionCache.get(req, res);
    };
}
exports.default = sessionFactory;
//# sourceMappingURL=get-session.js.map