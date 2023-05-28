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
exports.EventRegister = void 0;
const account_entity_1 = require("../../accounts/entities/account.entity");
const post_entity_1 = require("../../posts/entities/post.entity");
const qr_entity_1 = require("../../qr/entities/qr.entity");
const typeorm_1 = require("typeorm");
let EventRegister = class EventRegister {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EventRegister.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (account) => account.events, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], EventRegister.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.events, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], EventRegister.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => qr_entity_1.Qr, (qr) => qr.events),
    __metadata("design:type", Number)
], EventRegister.prototype, "qrs", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], EventRegister.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EventRegister.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EventRegister.prototype, "updateAt", void 0);
EventRegister = __decorate([
    (0, typeorm_1.Entity)()
], EventRegister);
exports.EventRegister = EventRegister;
//# sourceMappingURL=event_register.entity.js.map