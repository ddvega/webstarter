"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = exports.UserContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const use_config_1 = tslib_1.__importDefault(require("./use-config"));
/**
 * @ignore
 */
const missingUserProvider = 'You forgot to wrap your app in <UserProvider>';
/**
 * @ignore
 */
exports.UserContext = react_1.createContext({
    get user() {
        throw new Error(missingUserProvider);
    },
    get error() {
        throw new Error(missingUserProvider);
    },
    get isLoading() {
        throw new Error(missingUserProvider);
    },
    checkSession: () => {
        throw new Error(missingUserProvider);
    }
});
/**
 * @ignore
 */
const useUser = () => react_1.useContext(exports.UserContext);
exports.useUser = useUser;
exports.default = ({ children, user: initialUser, profileUrl = process.env.NEXT_PUBLIC_AUTH0_PROFILE || '/api/auth/me', loginUrl }) => {
    const [state, setState] = react_1.useState({ user: initialUser, isLoading: !initialUser });
    const checkSession = react_1.useCallback(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(profileUrl);
            const user = response.ok ? yield response.json() : undefined;
            setState((previous) => (Object.assign(Object.assign({}, previous), { user, error: undefined })));
        }
        catch (_e) {
            const error = new Error(`The request to ${profileUrl} failed`);
            setState((previous) => (Object.assign(Object.assign({}, previous), { user: undefined, error })));
        }
    }), [profileUrl]);
    react_1.useEffect(() => {
        if (state.user)
            return;
        (() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            yield checkSession();
            setState((previous) => (Object.assign(Object.assign({}, previous), { isLoading: false })));
        }))();
    }, [state.user]);
    const { user, error, isLoading } = state;
    return (react_1.default.createElement(use_config_1.default, { loginUrl: loginUrl },
        react_1.default.createElement(exports.UserContext.Provider, { value: { user, error, isLoading, checkSession } }, children)));
};
//# sourceMappingURL=use-user.js.map