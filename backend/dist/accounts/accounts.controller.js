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
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("./accounts.service");
const create_account_dto_1 = require("./dto/create-account.dto");
const update_account_dto_1 = require("./dto/update-account.dto");
const passport_1 = require("@nestjs/passport");
const password_hash_helper_1 = require("../helpers/password_hash.helper");
const email_service_1 = require("../email/email.service");
const typeorm_1 = require("@nestjs/typeorm");
const reset_password_entity_1 = require("../reset_password/entities/reset_password.entity");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("./entities/account.entity");
const password_compare_helper_1 = require("../helpers/password_compare.helper");
const templateResetPassword_1 = require("../helpers/templateResetPassword");
const roles_decorator_1 = require("../decorator/roles.decorator");
const role_enum_1 = require("../enums/role.enum");
let AccountsController = class AccountsController {
    constructor(accountsService, sendMailService, resetPasswordRepository, accountRepository) {
        this.accountsService = accountsService;
        this.sendMailService = sendMailService;
        this.resetPasswordRepository = resetPasswordRepository;
        this.accountRepository = accountRepository;
    }
    create(createAccountDto) {
        return this.accountsService.create(createAccountDto);
    }
    login(account) {
        console.log(account);
        return this.accountsService.login({ email: account.email });
    }
    async findAll() {
        return await this.accountsService.findAll();
    }
    findOne(id) {
        return this.accountsService.findOne(+id);
    }
    async forgotPassword(body, req) {
        try {
            const account = await this.accountsService.forgotPassword(body.email);
            if (!account) {
                return {
                    message: 'Account not found in our system !',
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            req.session.account = account.id;
            const { secret, paddedNumber } = await (0, password_hash_helper_1.hashResetPassword)();
            await this.sendMailService.sendEmailToResetPassword(body.email, 'RESET YOUR PASSWORD', (0, templateResetPassword_1.templateResetPassword)(paddedNumber));
            const checkAccountResetPassword = await this.resetPasswordRepository.findOne({
                where: { account: account.id },
            });
            if (checkAccountResetPassword) {
                await this.resetPasswordRepository.delete({ account: account.id });
            }
            const resetEntity = await this.resetPasswordRepository.create({
                secret,
                account: account.id,
            });
            await this.resetPasswordRepository.save(resetEntity);
            return {
                message: 'OTP was send to your email !',
                statusCode: common_1.HttpStatus.ACCEPTED,
            };
        }
        catch (error) {
            console.log(error);
            return {
                message: 'Server is wrong happend, Please  try later !',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
    }
    async confirmPasswod(req, body) {
        try {
            const { account } = req.session;
            if (account) {
                const secret = await this.resetPasswordRepository.findOne({
                    where: {
                        account: account,
                    },
                });
                const isCompareNumber = await (0, password_compare_helper_1.comparePassword)(body.secret, secret.secret);
                if (body.newPassword !== body.confirmNewPassword) {
                    return {
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: 'New password must same ComfirmPassword',
                    };
                }
                if (!isCompareNumber) {
                    return {
                        message: 'Confirmation code is incorrect !',
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                    };
                }
                const accounts = await this.accountRepository.findOne({
                    where: { id: account },
                });
                if (accounts) {
                    accounts.password = body.newPassword;
                    accounts['comfirmPassword'] = body.newPassword;
                    return await this.accountsService.update(accounts.id, accounts);
                }
            }
            else {
                return {
                    message: 'Please forgot email again !',
                };
            }
        }
        catch (error) { }
    }
    update(id, updateAccountDto) {
        return this.accountsService.update(+id, updateAccountDto);
    }
    remove(id) {
        return this.accountsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_dto_1.CreateAccountDto]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/forgot-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/confirm-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "confirmPasswod", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_account_dto_1.UpdateAccountDto]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "remove", null);
AccountsController = __decorate([
    (0, common_1.Controller)('account'),
    __param(2, (0, typeorm_1.InjectRepository)(reset_password_entity_1.ResetPassword)),
    __param(3, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService,
        email_service_1.EmailService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AccountsController);
exports.AccountsController = AccountsController;
//# sourceMappingURL=accounts.controller.js.map