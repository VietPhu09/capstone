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
exports.QrController = void 0;
const common_1 = require("@nestjs/common");
const qr_service_1 = require("./qr.service");
const create_qr_dto_1 = require("./dto/create-qr.dto");
const update_qr_dto_1 = require("./dto/update-qr.dto");
let QrController = class QrController {
    constructor(qrService) {
        this.qrService = qrService;
    }
    create(createQrDto) {
        return this.qrService.create(createQrDto);
    }
    findAll() {
        return this.qrService.findAll();
    }
    findOne(id) {
        return this.qrService.findOne(+id);
    }
    update(id, updateQrDto) {
        return this.qrService.update(+id, updateQrDto);
    }
    remove(id) {
        return this.qrService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_qr_dto_1.CreateQrDto]),
    __metadata("design:returntype", void 0)
], QrController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QrController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QrController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_qr_dto_1.UpdateQrDto]),
    __metadata("design:returntype", void 0)
], QrController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QrController.prototype, "remove", null);
QrController = __decorate([
    (0, common_1.Controller)('qr'),
    __metadata("design:paramtypes", [qr_service_1.QrService])
], QrController);
exports.QrController = QrController;
//# sourceMappingURL=qr.controller.js.map