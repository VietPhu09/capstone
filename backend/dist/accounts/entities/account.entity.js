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
exports.Account = void 0;
const event_register_entity_1 = require("../../event_register/entities/event_register.entity");
const post_entity_1 = require("../../posts/entities/post.entity");
const qr_entity_1 = require("../../qr/entities/qr.entity");
const quiz_entity_1 = require("../../quiz/entities/quiz.entity");
const role_entity_1 = require("../../roles/entities/role.entity");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
let Account = class Account {
    constructor() {
        this.role = 2;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Account.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Account.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Account.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Account.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Account.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Number)
], Account.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.account),
    __metadata("design:type", Array)
], Account.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_entity_1.Quiz, (quiz) => quiz.business),
    __metadata("design:type", Array)
], Account.prototype, "quizzes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.account),
    __metadata("design:type", Array)
], Account.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => qr_entity_1.Qr, (qr) => qr.account),
    __metadata("design:type", qr_entity_1.Qr)
], Account.prototype, "qr", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_register_entity_1.EventRegister, (event) => event.account, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Account.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Account.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Account.prototype, "updateAt", void 0);
Account = __decorate([
    (0, typeorm_1.Entity)()
], Account);
exports.Account = Account;
//# sourceMappingURL=account.entity.js.map