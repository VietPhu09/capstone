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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordController = void 0;
const common_1 = require("@nestjs/common");
const reset_password_service_1 = require("./reset_password.service");
const create_reset_password_dto_1 = require("./dto/create-reset_password.dto");
const update_reset_password_dto_1 = require("./dto/update-reset_password.dto");
let ResetPasswordController = class ResetPasswordController {
    constructor(resetPasswordService) {
        this.resetPasswordService = resetPasswordService;
    }
    create(createResetPasswordDto) {
        return this.resetPasswordService.create(createResetPasswordDto);
    }
    findAll() {
        return this.resetPasswordService.findAll();
    }
    findOne(id) {
        return this.resetPasswordService.findOne(+id);
    }
    update(id, updateResetPasswordDto) {
        return this.resetPasswordService.update(+id, updateResetPasswordDto);
    }
    remove(id) {
        return this.resetPasswordService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reset_password_dto_1.CreateResetPasswordDto]),
    __metadata("design:returntype", void 0)
], ResetPasswordController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResetPasswordController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResetPasswordController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_reset_password_dto_1.UpdateResetPasswordDto]),
    __metadata("design:returntype", void 0)
], ResetPasswordController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResetPasswordController.prototype, "remove", null);
ResetPasswordController = __decorate([
    (0, common_1.Controller)('reset-password'),
    __metadata("design:paramtypes", [reset_password_service_1.ResetPasswordService])
], ResetPasswordController);
exports.ResetPasswordController = ResetPasswordController;
//# sourceMappingURL=reset_password.controller.js.map