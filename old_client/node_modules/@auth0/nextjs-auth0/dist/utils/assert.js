"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertCtx = exports.assertReqRes = void 0;
const assertReqRes = (req, res) => {
    if (!req) {
        throw new Error('Request is not available');
    }
    if (!res) {
        throw new Error('Response is not available');
    }
};
exports.assertReqRes = assertReqRes;
const assertCtx = ({ req, res }) => {
    if (!req) {
        throw new Error('Request is not available');
    }
    if (!res) {
        throw new Error('Response is not available');
    }
};
exports.assertCtx = assertCtx;
//# sourceMappingURL=assert.js.map