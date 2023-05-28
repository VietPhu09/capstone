import { HttpStatus } from '@nestjs/common';
import { CreateEventRegisterDto } from './dto/create-event_register.dto';
import { UpdateEventRegisterDto } from './dto/update-event_register.dto';
import { EmailService } from 'src/email/email.service';
import { Connection, Repository } from 'typeorm';
import { EventRegister } from './entities/event_register.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Qr } from 'src/qr/entities/qr.entity';
import { Post } from 'src/posts/entities/post.entity';
export declare class EventRegisterService {
    private readonly emailService;
    private readonly connection;
    private readonly eventRepository;
    private readonly accountRepository;
    private readonly qrRepository;
    private readonly postRepository;
    constructor(emailService: EmailService, connection: Connection, eventRepository: Repository<EventRegister>, accountRepository: Repository<Account>, qrRepository: Repository<Qr>, postRepository: Repository<Post>);
    create(createEventRegisterDto: CreateEventRegisterDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    findAll(): string;
    findOne(account: number, post: number): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    update(id: number, updateEventRegisterDto: UpdateEventRegisterDto): string;
    remove(id: number): string;
}
