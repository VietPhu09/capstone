import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    create(createImageDto: CreateImageDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateImageDto: UpdateImageDto): string;
    remove(id: string): string;
}
