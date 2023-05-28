import { EventRegisterService } from './event_register.service';
import { CreateEventRegisterDto } from './dto/create-event_register.dto';
import { UpdateEventRegisterDto } from './dto/update-event_register.dto';
export declare class EventRegisterController {
    private readonly eventRegisterService;
    constructor(eventRegisterService: EventRegisterService);
    create(createEventRegisterDto: CreateEventRegisterDto): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    findAll(): string;
    findOne(account: string, post: string): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    update(id: string, updateEventRegisterDto: UpdateEventRegisterDto): string;
    remove(id: string): string;
}
