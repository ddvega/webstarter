"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = require("../utils/assert");
/**
 * @ignore
 */
function handleLogoutFactory(handler) {
    return (req, res, options) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        assert_1.assertReqRes(req, res);
        return handler(req, res, options);
    });
}
exports.default = handleLogoutFactory;
//# sourceMappingURL=logout.js.map