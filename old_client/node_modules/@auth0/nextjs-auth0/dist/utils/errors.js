"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenError = void 0;
/**
 * The error thrown by {@link GetAccessToken}
 *
 * @category Server
 */
class AccessTokenError extends Error {
    constructor(code, message) {
        super(message);
        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        // Machine readable code.
        this.code = code;
    }
}
exports.AccessTokenError = AccessTokenError;
//# sourceMappingURL=errors.js.map