import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findAll(): Promise<import("./entities/post.entity").Post[] | {
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    findOne(id: string): Promise<import("./entities/post.entity").Post | {
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
