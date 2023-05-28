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
exports.QuizService = void 0;
const quiz_entity_1 = require("./entities/quiz.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
let QuizService = class QuizService {
    constructor(quizRepository) {
        this.quizRepository = quizRepository;
    }
    async create(createQuizDto) {
        try {
            await this.quizRepository.save(createQuizDto);
            return {
                statusCode: common_1.HttpStatus.CREATED,
            };
        }
        catch (error) {
            console.log(error);
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
    }
    async findAll() { }
    findOne(id) {
        return `This action returns a #${id} `;
    }
    update(id, updateQuizDto) {
        return `This action updates a #${id} `;
    }
    remove(id) {
        return `This action removes a #${id} quiz`;
    }
};
QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(quiz_entity_1.Quiz)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], QuizService);
exports.QuizService = QuizService;
//# sourceMappingURL=quiz.service.js.map