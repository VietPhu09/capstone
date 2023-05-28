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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const accounts_service_1 = require("../accounts/accounts.service");
const roles_decorator_1 = require("../decorator/roles.decorator");
let RolesGuard = class RolesGuard {
    constructor(reflector, accountService, jwtService) {
        this.reflector = reflector;
        this.accountService = accountService;
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        var _a;
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const token = context.switchToHttp().getRequest().headers;
        const account = this.jwtService.verify((_a = token === null || token === void 0 ? void 0 : token.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
        const { id } = account;
        const findAccount = await this.accountService.findOne(id);
        return requiredRoles.some((role) => {
            var _a;
            return role === ((_a = findAccount === null || findAccount === void 0 ? void 0 : findAccount.role) === null || _a === void 0 ? void 0 : _a.role_name);
        });
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        accounts_service_1.AccountsService,
        jwt_1.JwtService])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map