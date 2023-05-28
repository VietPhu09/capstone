import { EmailService } from 'src/email/email.service';
import { Post } from 'src/posts/entities/post.entity';
import { Repository } from 'typeorm';
export declare class ScheduleService {
    private readonly postRepository;
    private readonly emailService;
    constructor(postRepository: Repository<Post>, emailService: EmailService);
    handleSchedule(): Promise<void>;
}
