"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const accounts_module_1 = require("./accounts/accounts.module");
const posts_module_1 = require("./posts/posts.module");
const image_module_1 = require("./image/image.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("./config/typeorm.config");
const file_module_1 = require("./file/file.module");
const auth_module_1 = require("./auth/auth.module");
const quiz_module_1 = require("./quiz/quiz.module");
const event_register_module_1 = require("./event_register/event_register.module");
const email_module_1 = require("./email/email.module");
const qr_module_1 = require("./qr/qr.module");
const schedule_module_1 = require("./schedule/schedule.module");
const reset_password_module_1 = require("./reset_password/reset_password.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync(typeorm_config_1.typeOrmAsyncConfig),
            posts_module_1.PostsModule,
            accounts_module_1.AccountsModule,
            image_module_1.ImageModule,
            file_module_1.FileModule,
            auth_module_1.AuthModule,
            quiz_module_1.QuizModule,
            event_register_module_1.EventRegisterModule,
            email_module_1.EmailModule,
            qr_module_1.QrModule,
            schedule_module_1.ScheduleModule,
            reset_password_module_1.ResetPasswordModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map