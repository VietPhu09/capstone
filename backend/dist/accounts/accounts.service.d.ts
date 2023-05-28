import { HttpStatus } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { Image } from 'src/image/entities/image.entity';
import { AuthService } from 'src/auth/auth.service';
import { Connection } from 'typeorm';
export declare class AccountsService {
    private readonly accountRepository;
    private readonly imageRepository;
    private readonly authService;
    private readonly connection;
    constructor(accountRepository: Repository<Account>, imageRepository: Repository<Image>, authService: AuthService, connection: Connection);
    create(createAccountDto: CreateAccountDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    login(account: {
        email: string;
    }): Promise<{
        access_token: string;
        id: any;
    }>;
    findAll(): Promise<{
        length: number;
        accounts: Account[];
    }>;
    findOne(id: number): Promise<Account | undefined | Object>;
    update(id: number, updateAccountDto: UpdateAccountDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    remove(id: number): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    forgotPassword(email: string): Promise<Account | Object>;
}
