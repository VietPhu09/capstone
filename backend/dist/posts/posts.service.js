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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const image_entity_1 = require("../image/entities/image.entity");
const typeorm_2 = require("@nestjs/typeorm");
let PostsService = class PostsService {
    constructor(connection, postRepository, imageRepository) {
        this.connection = connection;
        this.postRepository = postRepository;
        this.imageRepository = imageRepository;
    }
    async create(createPostDto) {
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { files, account } = createPostDto;
            const id = await (0, typeorm_1.getManager)().transaction(async (transactionalEntityManager) => {
                const post = await this.postRepository.create(createPostDto);
                const savePost = await transactionalEntityManager.save(post);
                const postId = savePost.id;
                return postId;
            });
            for (let i = 0; i < files.length; i++) {
                const image = await this.imageRepository.create({
                    image_url: files[i],
                    post: id,
                });
                await queryRunner.manager.save('image', image);
            }
            await queryRunner.commitTransaction();
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Create Post Successfully !',
            };
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException('Create Post Fail !', common_1.HttpStatus.BAD_REQUEST);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        const posts = await this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.account', 'account')
            .leftJoinAndSelect('post.images', 'images')
            .leftJoinAndSelect('post.events', 'events')
            .leftJoinAndSelect('events.account', 'eventAccount')
            .getMany();
        if (!posts) {
            return {
                message: `Post doesn't exits in system !`,
                statusCode: common_1.HttpStatus.NOT_FOUND,
            };
        }
        return posts;
    }
    async findOne(id) {
        const post = await this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.account', 'account')
            .leftJoinAndSelect('post.images', 'images')
            .leftJoinAndSelect('post.events', 'events')
            .leftJoinAndSelect('events.account', 'eventAccount')
            .where('post.id =:id', { id })
            .getOne();
        if (!post) {
            return {
                message: `Post doesn't exits in system !`,
                statusCode: common_1.HttpStatus.NOT_FOUND,
            };
        }
        return post;
    }
    async update(id, updatePostDto) {
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { files } = updatePostDto;
            if (files.length > 0) {
                await queryRunner.manager.delete('image', { post: id });
                for (let i = 0; i < files.length; i++) {
                    const image = await this.imageRepository.create({
                        image_url: files[i],
                        post: id,
                    });
                    await queryRunner.manager.save('image', image);
                }
            }
            delete updatePostDto.files;
            const findOnePost = await this.postRepository.findOne({ where: { id } });
            if (!findOnePost) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: "Post doesn't exits in system !",
                };
            }
            await queryRunner.manager.update('post', id, updatePostDto);
            await queryRunner.commitTransaction();
            return {
                message: 'Update Post Successful',
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
    async remove(id) {
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const post = await this.postRepository.findOne({ where: { id } });
            if (!post) {
                return {
                    message: "Post doesn't exits in system !",
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            await queryRunner.manager.remove('post', post);
            await queryRunner.commitTransaction();
            return {
                message: 'Delete post Successful',
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
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(post_entity_1.Post)),
    __param(2, (0, typeorm_2.InjectRepository)(image_entity_1.Image)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        typeorm_1.Repository,
        typeorm_1.Repository])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map