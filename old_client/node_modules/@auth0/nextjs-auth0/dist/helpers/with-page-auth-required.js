"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = require("../utils/assert");
const frontend_1 = require("../frontend");
/**
 * @ignore
 */
function withPageAuthRequiredFactory(loginUrl, getSession) {
    return (optsOrComponent = {}, csrOpts) => {
        if (typeof optsOrComponent === 'function') {
            return frontend_1.withPageAuthRequired(optsOrComponent, csrOpts);
        }
        const { getServerSideProps, returnTo } = optsOrComponent;
        return (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            assert_1.assertCtx(ctx);
            const session = getSession(ctx.req, ctx.res);
            if (!(session === null || session === void 0 ? void 0 : session.user)) {
                // 10 - redirect
                // 9.5.4 - unstable_redirect
                // 9.4 - res.setHeaders
                return {
                    redirect: {
                        destination: `${loginUrl}?returnTo=${encodeURIComponent(returnTo || ctx.resolvedUrl)}`,
                        permanent: false
                    }
                };
            }
            let ret = { props: {} };
            if (getServerSideProps) {
                ret = yield getServerSideProps(ctx);
            }
            return Object.assign(Object.assign({}, ret), { props: Object.assign(Object.assign({}, ret.props), { user: session.user }) });
        });
    };
}
exports.default = withPageAuthRequiredFactory;
//# sourceMappingURL=with-page-auth-required.js.map