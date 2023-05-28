import { QuizService } from './quiz.service';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    create(createQuizDto: CreateQuizDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    findAll(): Promise<void>;
    findOne(id: string): string;
    update(id: string, updateQuizDto: UpdateQuizDto): string;
    remove(id: string): string;
}
