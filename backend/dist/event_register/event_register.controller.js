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
exports.EventRegisterController = void 0;
const common_1 = require("@nestjs/common");
const event_register_service_1 = require("./event_register.service");
const create_event_register_dto_1 = require("./dto/create-event_register.dto");
const update_event_register_dto_1 = require("./dto/update-event_register.dto");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../decorator/roles.decorator");
const role_enum_1 = require("../enums/role.enum");
let EventRegisterController = class EventRegisterController {
    constructor(eventRegisterService) {
        this.eventRegisterService = eventRegisterService;
    }
    create(createEventRegisterDto) {
        return this.eventRegisterService.create(createEventRegisterDto);
    }
    findAll() {
        return this.eventRegisterService.findAll();
    }
    findOne(account, post) {
        return this.eventRegisterService.findOne(+account, +post);
    }
    update(id, updateEventRegisterDto) {
        return this.eventRegisterService.update(+id, updateEventRegisterDto);
    }
    remove(id) {
        return this.eventRegisterService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_register_dto_1.CreateEventRegisterDto]),
    __metadata("design:returntype", void 0)
], EventRegisterController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventRegisterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/check/:account/:post'),
    __param(0, (0, common_1.Param)('account')),
    __param(1, (0, common_1.Param)('post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EventRegisterController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_register_dto_1.UpdateEventRegisterDto]),
    __metadata("design:returntype", void 0)
], EventRegisterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventRegisterController.prototype, "remove", null);
EventRegisterController = __decorate([
    (0, common_1.Controller)('event-register'),
    __metadata("design:paramtypes", [event_register_service_1.EventRegisterService])
], EventRegisterController);
exports.EventRegisterController = EventRegisterController;
//# sourceMappingURL=event_register.controller.js.map