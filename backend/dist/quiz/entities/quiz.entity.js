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
exports.Quiz = void 0;
const account_entity_1 = require("../../accounts/entities/account.entity");
const typeorm_1 = require("typeorm");
let Quiz = class Quiz {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Quiz.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], Quiz.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Number)
], Quiz.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Number)
], Quiz.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Quiz.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Quiz.prototype, "updateAt", void 0);
Quiz = __decorate([
    (0, typeorm_1.Entity)()
], Quiz);
exports.Quiz = Quiz;
//# sourceMappingURL=quiz.entity.js.map