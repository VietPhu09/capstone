import { QrService } from './qr.service';
import { CreateQrDto } from './dto/create-qr.dto';
import { UpdateQrDto } from './dto/update-qr.dto';
export declare class QrController {
    private readonly qrService;
    constructor(qrService: QrService);
    create(createQrDto: CreateQrDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateQrDto: UpdateQrDto): string;
    remove(id: string): string;
}
