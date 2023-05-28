"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = void 0;
const bcrypt = require("bcrypt");
const comparePassword = async (password, hash) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=password_compare.helper.js.map