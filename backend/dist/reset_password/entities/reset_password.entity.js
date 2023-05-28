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
exports.ResetPassword = void 0;
const account_entity_1 = require("../../accounts/entities/account.entity");
const typeorm_1 = require("typeorm");
let ResetPassword = class ResetPassword {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ResetPassword.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => account_entity_1.Account, (account) => account.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], ResetPassword.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResetPassword.prototype, "secret", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ResetPassword.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ResetPassword.prototype, "updateAt", void 0);
ResetPassword = __decorate([
    (0, typeorm_1.Entity)()
], ResetPassword);
exports.ResetPassword = ResetPassword;
//# sourceMappingURL=reset_password.entity.js.map