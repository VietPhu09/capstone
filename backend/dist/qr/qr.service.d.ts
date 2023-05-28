import { CreateQrDto } from './dto/create-qr.dto';
import { UpdateQrDto } from './dto/update-qr.dto';
export declare class QrService {
    create(createQrDto: CreateQrDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateQrDto: UpdateQrDto): string;
    remove(id: number): string;
}
