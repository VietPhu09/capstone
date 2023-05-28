"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const jwt_strategy_1 = require("./jwt.strategy");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const accounts_module_1 = require("../accounts/accounts.module");
const auth_service_1 = require("./auth.service");
const constants_1 = require("./constants");
const local_strategy_1 = require("./local.strategy");
const accounts_service_1 = require("../accounts/accounts.service");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("../accounts/entities/account.entity");
const image_entity_1 = require("../image/entities/image.entity");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([account_entity_1.Account, image_entity_1.Image]),
            accounts_module_1.AccountsModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
            }),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, accounts_service_1.AccountsService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map