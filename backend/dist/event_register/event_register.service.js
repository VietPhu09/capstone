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
exports.EventRegisterService = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("../email/email.service");
const QR = require('qrcode');
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const event_register_entity_1 = require("./entities/event_register.entity");
const account_entity_1 = require("../accounts/entities/account.entity");
const contains_1 = require("../contains");
const qr_entity_1 = require("../qr/entities/qr.entity");
const post_entity_1 = require("../posts/entities/post.entity");
const templateEvent_1 = require("../helpers/templateEvent");
const covertTime_1 = require("../helpers/covertTime");
let EventRegisterService = class EventRegisterService {
    constructor(emailService, connection, eventRepository, accountRepository, qrRepository, postRepository) {
        this.emailService = emailService;
        this.connection = connection;
        this.eventRepository = eventRepository;
        this.accountRepository = accountRepository;
        this.qrRepository = qrRepository;
        this.postRepository = postRepository;
    }
    async create(createEventRegisterDto) {
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { account, post } = createEventRegisterDto;
            const accounts = await this.eventRepository.find({
                where: { account, post },
            });
            const posts = await this.postRepository.findOne({ where: { id: post } });
            if (accounts.length > 0) {
                return {
                    message: `You are registed, don't spam please !`,
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            if (!posts) {
                return {
                    message: `Post is doesn't exits in our system !`,
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            if (posts.slot === 0) {
                return {
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Not enough slot, see you again other event !',
                };
            }
            --posts.slot;
            const { startDay, startTime } = posts;
            const id = await (0, typeorm_1.getManager)().transaction(async (transactionalEntityManager) => {
                const event = await this.eventRepository.create(createEventRegisterDto);
                const saveEvent = await transactionalEntityManager.save(event);
                const eventId = saveEvent.id;
                return eventId;
            });
            const findAccount = await this.accountRepository.findOne({
                where: { id: account },
            });
            if ((findAccount === null || findAccount === void 0 ? void 0 : findAccount.email) && (findAccount === null || findAccount === void 0 ? void 0 : findAccount.id)) {
                const qr = await QR.toDataURL(`${contains_1.LINK}/event_register/check/${findAccount === null || findAccount === void 0 ? void 0 : findAccount.id}/${post}`);
                const qrEntity = await this.qrRepository.create({
                    qr_link: qr,
                    account: findAccount === null || findAccount === void 0 ? void 0 : findAccount.id,
                    events: id,
                });
                await queryRunner.manager.save(qr_entity_1.Qr, qrEntity);
                await queryRunner.manager.update(post_entity_1.Post, { id: posts.id }, posts);
                await this.emailService.sendEmail(findAccount === null || findAccount === void 0 ? void 0 : findAccount.email, 'Thank you for signing up for the event', (0, templateEvent_1.templateEvent)(findAccount.username, (0, covertTime_1.convertTime)(startDay), startTime, posts.title), qr);
            }
            await queryRunner.commitTransaction();
            return {
                message: 'Register event successful !',
                statusCode: common_1.HttpStatus.CREATED,
            };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    findAll() {
        return `This action returns all eventRegister`;
    }
    async findOne(account, post) {
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const event = await this.eventRepository.findOne({
                where: { account, post },
            });
            if (!event) {
                return {
                    message: 'Tài khoản chưa đăng kí sự kiện !',
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            queryRunner.manager.update(event_register_entity_1.EventRegister, { account, post }, { status: true });
            await queryRunner.commitTransaction();
            return {
                message: 'Điểm danh thành công !',
                statusCode: common_1.HttpStatus.ACCEPTED,
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException('Create Account Fail !', common_1.HttpStatus.BAD_REQUEST);
        }
        finally {
            await queryRunner.release();
        }
    }
    update(id, updateEventRegisterDto) {
        return `This action updates a #${id} eventRegister`;
    }
    remove(id) {
        return `This action removes a #${id} eventRegister`;
    }
};
EventRegisterService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(event_register_entity_1.EventRegister)),
    __param(3, (0, typeorm_2.InjectRepository)(account_entity_1.Account)),
    __param(4, (0, typeorm_2.InjectRepository)(qr_entity_1.Qr)),
    __param(5, (0, typeorm_2.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        typeorm_1.Connection,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], EventRegisterService);
exports.EventRegisterService = EventRegisterService;
//# sourceMappingURL=event_register.service.js.map