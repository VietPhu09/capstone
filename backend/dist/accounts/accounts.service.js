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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const account_entity_1 = require("./entities/account.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const image_entity_1 = require("../image/entities/image.entity");
const auth_service_1 = require("../auth/auth.service");
const password_hash_helper_1 = require("../helpers/password_hash.helper");
const typeorm_3 = require("typeorm");
let AccountsService = class AccountsService {
    constructor(accountRepository, imageRepository, authService, connection) {
        this.accountRepository = accountRepository;
        this.imageRepository = imageRepository;
        this.authService = authService;
        this.connection = connection;
    }
    async create(createAccountDto) {
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { email, files } = createAccountDto;
            const findAccount = await this.accountRepository.findOne({
                where: { email },
            });
            if (findAccount) {
                return {
                    message: 'Account already exists in the system, please re-register!',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            createAccountDto.password = await (0, password_hash_helper_1.hashPassword)(createAccountDto.password);
            const id = await (0, typeorm_1.getManager)().transaction(async (transactionalEntityManager) => {
                const account = await this.accountRepository.create(createAccountDto);
                const saveAccount = await transactionalEntityManager.save(account);
                const accountId = saveAccount.id;
                return accountId;
            });
            for (let i = 0; i < files.length; i++) {
                const image = await this.imageRepository.create({
                    image_url: files[i],
                    account: id,
                });
                await queryRunner.manager.save('image', image);
            }
            await queryRunner.commitTransaction();
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Create Account Successfully !',
            };
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException('Create Account Fail !', common_1.HttpStatus.BAD_REQUEST);
        }
        finally {
            await queryRunner.release();
        }
    }
    login(account) {
        return this.authService.login(account);
    }
    async findAll() {
        const accounts = await this.accountRepository
            .createQueryBuilder('account')
            .leftJoinAndSelect('account.role', 'role')
            .leftJoinAndSelect('account.quizzes', 'quiz')
            .leftJoinAndSelect('account.posts', 'posts')
            .leftJoinAndSelect('quiz.account', 'quizAccount')
            .leftJoinAndSelect('posts.images', 'images')
            .leftJoinAndSelect('account.events', 'events')
            .leftJoinAndSelect('events.post', 'post')
            .leftJoinAndSelect('events.qrs', 'qrs')
            .getMany();
        return {
            length: accounts.length,
            accounts,
        };
    }
    async findOne(id) {
        const account = await this.accountRepository
            .createQueryBuilder('account')
            .leftJoinAndSelect('account.role', 'role')
            .leftJoinAndSelect('account.quizzes', 'quiz')
            .leftJoinAndSelect('account.posts', 'posts')
            .leftJoinAndSelect('quiz.account', 'quizAccount')
            .leftJoinAndSelect('posts.images', 'images')
            .leftJoinAndSelect('account.events', 'events')
            .leftJoinAndSelect('events.post', 'post')
            .leftJoinAndSelect('events.qrs', 'qrs')
            .where('account.id =:id', { id })
            .getOne();
        return account;
    }
    async update(id, updateAccountDto) {
        var _a;
        console.log(updateAccountDto);
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const account = await this.accountRepository.findOne({ where: { id } });
            if (!account) {
                return {
                    message: "Account doesn't exits in system !",
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            if (updateAccountDto.password && !updateAccountDto.comfirmPassword) {
                return {
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'If you want to change password, please enter full password and comfirmPassword',
                };
            }
            if (updateAccountDto.password && updateAccountDto.comfirmPassword) {
                if (updateAccountDto.password !== updateAccountDto.comfirmPassword) {
                    return {
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: 'Passwords do not match',
                    };
                }
                updateAccountDto.password = await (0, password_hash_helper_1.hashPassword)(updateAccountDto.password);
                delete updateAccountDto.comfirmPassword;
            }
            if (((_a = updateAccountDto === null || updateAccountDto === void 0 ? void 0 : updateAccountDto.files) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                const image = await this.imageRepository.findOne({
                    where: { account: account.id },
                });
                image.image_url = updateAccountDto.files[0];
                await queryRunner.manager.update(image_entity_1.Image, image.id, image);
                delete updateAccountDto.files;
            }
            await queryRunner.manager.update('account', id, updateAccountDto);
            await queryRunner.commitTransaction();
            return {
                message: 'Update account Successful',
                statusCode: common_1.HttpStatus.ACCEPTED,
            };
        }
        catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const account = await this.accountRepository.findOne({ where: { id } });
            if (!account) {
                return {
                    message: "Account doesn't exits in system !",
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            await queryRunner.manager.remove('account', account);
            await queryRunner.commitTransaction();
            return {
                message: 'Delete account Successful',
                statusCode: common_1.HttpStatus.ACCEPTED,
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
    async forgotPassword(email) {
        try {
            const account = await this.accountRepository.findOne({
                where: { email },
            });
            return account;
        }
        catch (error) { }
    }
};
AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(account_entity_1.Account)),
    __param(1, (0, typeorm_2.InjectRepository)(image_entity_1.Image)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        auth_service_1.AuthService,
        typeorm_3.Connection])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map