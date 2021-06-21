"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = require("assert");
const assert_2 = require("../utils/assert");
/**
 * @ignore
 */
const idTokenValidator = (afterCallback, organization) => (req, res, session, state) => {
    if (organization) {
        assert_1.strict(session.user.org_id, 'Organization Id (org_id) claim must be a string present in the ID token');
        assert_1.strict.equal(session.user.org_id, organization, `Organization Id (org_id) claim value mismatch in the ID token; ` +
            `expected "${organization}", found "${session.user.org_id}"`);
    }
    if (afterCallback) {
        return afterCallback(req, res, session, state);
    }
    return session;
};
/**
 * @ignore
 */
function handleCallbackFactory(handler, config) {
    return (req, res, options = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        assert_2.assertReqRes(req, res);
        return handler(req, res, Object.assign(Object.assign({}, options), { afterCallback: idTokenValidator(options.afterCallback, options.organization || config.organization) }));
    });
}
exports.default = handleCallbackFactory;
//# sourceMappingURL=callback.js.map