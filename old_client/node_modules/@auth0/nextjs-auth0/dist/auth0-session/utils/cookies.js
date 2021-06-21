"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = exports.set = exports.get = exports.getAll = void 0;
const cookie_1 = require("cookie");
const getAll = (req) => {
    return cookie_1.parse(req.headers.cookie || '');
};
exports.getAll = getAll;
const get = (req, name) => {
    const cookies = exports.getAll(req);
    return cookies[name];
};
exports.get = get;
const set = (res, name, value, options = {}) => {
    const strCookie = cookie_1.serialize(name, value, options);
    let previousCookies = res.getHeader('Set-Cookie') || [];
    if (!Array.isArray(previousCookies)) {
        previousCookies = [previousCookies];
    }
    res.setHeader('Set-Cookie', [...previousCookies, strCookie]);
};
exports.set = set;
const clear = (res, name, options = {}) => {
    exports.set(res, name, '', Object.assign(Object.assign({}, options), { maxAge: 0 }));
};
exports.clear = clear;
//# sourceMappingURL=cookies.js.map