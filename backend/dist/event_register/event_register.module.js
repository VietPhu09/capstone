"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRegisterModule = void 0;
const common_1 = require("@nestjs/common");
const event_register_service_1 = require("./event_register.service");
const event_register_controller_1 = require("./event_register.controller");
const email_module_1 = require("../email/email.module");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const event_register_entity_1 = require("./entities/event_register.entity");
const accounts_module_1 = require("../accounts/accounts.module");
const account_entity_1 = require("../accounts/entities/account.entity");
const image_entity_1 = require("../image/entities/image.entity");
const qr_entity_1 = require("../qr/entities/qr.entity");
const post_entity_1 = require("../posts/entities/post.entity");
let EventRegisterModule = class EventRegisterModule {
};
EventRegisterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            email_module_1.EmailModule,
            typeorm_2.TypeOrmModule.forFeature([event_register_entity_1.EventRegister, account_entity_1.Account, image_entity_1.Image, qr_entity_1.Qr, post_entity_1.Post]),
            accounts_module_1.AccountsModule,
        ],
        controllers: [event_register_controller_1.EventRegisterController],
        providers: [event_register_service_1.EventRegisterService, typeorm_1.Repository],
        exports: [typeorm_1.Repository],
    })
], EventRegisterModule);
exports.EventRegisterModule = EventRegisterModule;
//# sourceMappingURL=event_register.module.js.map