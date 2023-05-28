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
exports.Post = void 0;
const account_entity_1 = require("../../accounts/entities/account.entity");
const event_register_entity_1 = require("../../event_register/entities/event_register.entity");
const image_entity_1 = require("../../image/entities/image.entity");
const typeorm_1 = require("typeorm");
let Post = class Post {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Post.prototype, "slot", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "startDay", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.images, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], Post.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Image, (image) => image.post),
    __metadata("design:type", Array)
], Post.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_register_entity_1.EventRegister, (event) => event.post),
    __metadata("design:type", Array)
], Post.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Post.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Post.prototype, "updateAt", void 0);
Post = __decorate([
    (0, typeorm_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map