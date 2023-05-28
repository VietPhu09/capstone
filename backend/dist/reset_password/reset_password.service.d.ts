import { CreateResetPasswordDto } from './dto/create-reset_password.dto';
import { UpdateResetPasswordDto } from './dto/update-reset_password.dto';
export declare class ResetPasswordService {
    create(createResetPasswordDto: CreateResetPasswordDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateResetPasswordDto: UpdateResetPasswordDto): string;
    remove(id: number): string;
}
