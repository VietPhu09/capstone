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
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const email_service_1 = require("../email/email.service");
const templateEvent_1 = require("../helpers/templateEvent");
const post_entity_1 = require("../posts/entities/post.entity");
const typeorm_2 = require("typeorm");
var cron = require('node-cron');
let ScheduleService = class ScheduleService {
    constructor(postRepository, emailService) {
        this.postRepository = postRepository;
        this.emailService = emailService;
        this.handleSchedule();
        console.log('Trích xuất ngày');
    }
    async handleSchedule() {
        try {
            cron.schedule('0 6 * * *', async () => {
                const date = new Date();
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const result = `${year}-${month}-${day}`;
                const posts = await this.postRepository
                    .createQueryBuilder('post')
                    .leftJoinAndSelect('post.events', 'events')
                    .leftJoinAndSelect('events.account', 'account')
                    .leftJoinAndSelect('events.qrs', 'qrs')
                    .getMany();
                console.log('------------------------------------------------', posts.length);
                if (posts.length > 0) {
                    for (let i = 0; i < posts.length; i++) {
                        const { events, startTime, title } = posts[i];
                        for (let j = 0; j < events.length; j++) {
                            const event = events[j];
                            const { email, username } = event.account;
                            const qr = event.qrs[0].qr_link;
                            console.log(email);
                            await this.emailService.sendEmail(email, `JOIN OUR EVENT ON ${startTime} - ${day}/${month}/${year}`, (0, templateEvent_1.templateEvent)(username, `${day}/${month}/${year}`, startTime, title), qr);
                        }
                    }
                }
            });
        }
        catch (error) { }
    }
};
ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map