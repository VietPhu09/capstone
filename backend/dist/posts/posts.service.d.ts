import { HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Connection, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Image } from 'src/image/entities/image.entity';
export declare class PostsService {
    private readonly connection;
    private readonly postRepository;
    private readonly imageRepository;
    constructor(connection: Connection, postRepository: Repository<Post>, imageRepository: Repository<Image>);
    create(createPostDto: CreatePostDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    findAll(): Promise<Post[] | {
        message: string;
        statusCode: HttpStatus;
    }>;
    findOne(id: number): Promise<Post | {
        message: string;
        statusCode: HttpStatus;
    }>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
}
