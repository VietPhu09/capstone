import { HttpStatus } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { EmailService } from 'src/email/email.service';
import { ResetPassword } from 'src/reset_password/entities/reset_password.entity';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
export declare class AccountsController {
    private readonly accountsService;
    private readonly sendMailService;
    private readonly resetPasswordRepository;
    private readonly accountRepository;
    constructor(accountsService: AccountsService, sendMailService: EmailService, resetPasswordRepository: Repository<ResetPassword>, accountRepository: Repository<Account>);
    create(createAccountDto: CreateAccountDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    login(account: any): Promise<{
        access_token: string;
        id: any;
    }>;
    findAll(): Promise<{
        length: number;
        accounts: Account[];
    }>;
    findOne(id: string): Promise<Object | Account>;
    forgotPassword(body: {
        email: string;
    }, req: any): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    confirmPasswod(req: any, body: {
        secret: string;
        newPassword: string;
        confirmNewPassword: string;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
    } | {
        message: string;
        statusCode?: undefined;
    }>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    remove(id: string): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
}
