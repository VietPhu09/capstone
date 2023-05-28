"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashResetPassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
};
exports.hashPassword = hashPassword;
const hashResetPassword = async () => {
    const saltRounds = 4;
    let randomNumber = Math.floor(Math.random() * 100000);
    let paddedNumber = randomNumber.toString().padStart(5, '0');
    const secret = await bcrypt.hash(paddedNumber.toString(), saltRounds);
    return {
        paddedNumber,
        secret,
    };
};
exports.hashResetPassword = hashResetPassword;
//# sourceMappingURL=password_hash.helper.js.map