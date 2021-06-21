"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = require("../utils/assert");
/**
 * @ignore
 */
function withApiAuthFactory(sessionCache) {
    return (apiRoute) => (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        assert_1.assertReqRes(req, res);
        const session = sessionCache.get(req, res);
        if (!session || !session.user) {
            res.status(401).json({
                error: 'not_authenticated',
                description: 'The user does not have an active session or is not authenticated'
            });
            return;
        }
        yield apiRoute(req, res);
    });
}
exports.default = withApiAuthFactory;
//# sourceMappingURL=with-api-auth-required.js.map