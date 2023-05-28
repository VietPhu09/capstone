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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const contains_1 = require("../contains");
let EmailService = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: contains_1.EMAIL_USERNAME,
                pass: contains_1.EMAIL_PASSWORD,
            },
        });
    }
    async sendEmail(to, subject, text, qr) {
        await this.transporter.sendMail({
            from: contains_1.EMAIL_USERNAME,
            to,
            subject,
            text,
            attachments: [
                {
                    filename: 'qr.png',
                    cid: 'batman',
                    path: qr,
                },
            ],
        });
    }
    async sendEmailToResetPassword(to, subject, text) {
        await this.transporter.sendMail({
            from: contains_1.EMAIL_USERNAME,
            to,
            subject,
            html: text,
        });
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map