"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsModule = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("./accounts.service");
const accounts_controller_1 = require("./accounts.controller");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("./entities/account.entity");
const image_entity_1 = require("../image/entities/image.entity");
const auth_service_1 = require("../auth/auth.service");
const constants_1 = require("../auth/constants");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("../auth/roles.guard");
const typeorm_2 = require("typeorm");
const email_module_1 = require("../email/email.module");
const reset_password_entity_1 = require("../reset_password/entities/reset_password.entity");
let AccountsModule = class AccountsModule {
};
AccountsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            email_module_1.EmailModule,
            typeorm_1.TypeOrmModule.forFeature([account_entity_1.Account, image_entity_1.Image, reset_password_entity_1.ResetPassword]),
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '2h' },
            }),
        ],
        controllers: [accounts_controller_1.AccountsController],
        providers: [
            accounts_service_1.AccountsService,
            auth_service_1.AuthService,
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            typeorm_2.Repository,
        ],
        exports: [accounts_service_1.AccountsService, typeorm_2.Repository],
    })
], AccountsModule);
exports.AccountsModule = AccountsModule;
//# sourceMappingURL=accounts.module.js.map