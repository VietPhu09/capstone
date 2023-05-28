"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const password_compare_helper_1 = require("../helpers/password_compare.helper");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const account_entity_1 = require("../accounts/entities/account.entity");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async validateAccount(email, pass) {
        try {
            const account = await (0, typeorm_1.getRepository)(account_entity_1.Account)
                .createQueryBuilder('account')
                .where({ email: email })
                .getOne();
            const isMatch = await (0, password_compare_helper_1.comparePassword)(pass, account === null || account === void 0 ? void 0 : account.password);
            if (account && isMatch === true) {
                const { password, address, sex } = account, result = __rest(account, ["password", "address", "sex"]);
                return result;
            }
            return null;
        }
        catch (error) {
            console.log(error);
        }
    }
    async login({ email }) {
        const account = await (0, typeorm_1.getManager)().findOne('account', {
            where: { email },
        });
        const payload = { email: account.email, id: account.id };
        return {
            access_token: this.jwtService.sign(payload),
            id: account.id,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map