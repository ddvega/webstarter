"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const url_helpers_1 = tslib_1.__importDefault(require("../utils/url-helpers"));
const assert_1 = require("../utils/assert");
/**
 * @ignore
 */
function handleLoginFactory(handler, nextConfig) {
    return (req, res, options = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        assert_1.assertReqRes(req, res);
        if (req.query.returnTo) {
            const returnTo = Array.isArray(req.query.returnTo) ? req.query.returnTo[0] : req.query.returnTo;
            if (!url_helpers_1.default(returnTo)) {
                throw new Error('Invalid value provided for returnTo, must be a relative url');
            }
            options = Object.assign(Object.assign({}, options), { returnTo });
        }
        if (nextConfig.organization) {
            options = Object.assign(Object.assign({}, options), { authorizationParams: Object.assign({ organization: nextConfig.organization }, options.authorizationParams) });
        }
        return handler(req, res, options);
    });
}
exports.default = handleLoginFactory;
//# sourceMappingURL=login.js.map