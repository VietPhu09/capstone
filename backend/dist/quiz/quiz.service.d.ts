import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
export declare class QuizService {
    private readonly quizRepository;
    constructor(quizRepository: Repository<Quiz>);
    create(createQuizDto: CreateQuizDto): Promise<{
        statusCode: HttpStatus;
    }>;
    findAll(): Promise<void>;
    findOne(id: number): string;
    update(id: number, updateQuizDto: UpdateQuizDto): string;
    remove(id: number): string;
}
