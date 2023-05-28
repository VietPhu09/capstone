import { ResetPasswordService } from './reset_password.service';
import { CreateResetPasswordDto } from './dto/create-reset_password.dto';
import { UpdateResetPasswordDto } from './dto/update-reset_password.dto';
export declare class ResetPasswordController {
    private readonly resetPasswordService;
    constructor(resetPasswordService: ResetPasswordService);
    create(createResetPasswordDto: CreateResetPasswordDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateResetPasswordDto: UpdateResetPasswordDto): string;
    remove(id: string): string;
}
