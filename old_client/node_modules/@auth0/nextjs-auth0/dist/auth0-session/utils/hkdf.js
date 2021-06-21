"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signing = exports.encryption = void 0;
const tslib_1 = require("tslib");
const futoin_hkdf_1 = tslib_1.__importDefault(require("futoin-hkdf"));
const BYTE_LENGTH = 32;
const ENCRYPTION_INFO = 'JWE CEK';
const SIGNING_INFO = 'JWS Cookie Signing';
const options = { hash: 'SHA-256' };
/**
 *
 * Derives appropriate sized keys from the end-user provided secret random string/passphrase using
 * HKDF (HMAC-based Extract-and-Expand Key Derivation Function) defined in RFC 8569
 *
 * @see https://tools.ietf.org/html/rfc5869
 *
 */
const encryption = (secret) => futoin_hkdf_1.default(secret, BYTE_LENGTH, Object.assign({ info: ENCRYPTION_INFO }, options));
exports.encryption = encryption;
const signing = (secret) => futoin_hkdf_1.default(secret, BYTE_LENGTH, Object.assign({ info: SIGNING_INFO }, options));
exports.signing = signing;
//# sourceMappingURL=hkdf.js.map