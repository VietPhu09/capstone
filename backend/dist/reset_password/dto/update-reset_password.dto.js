"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResetPasswordDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_reset_password_dto_1 = require("./create-reset_password.dto");
class UpdateResetPasswordDto extends (0, mapped_types_1.PartialType)(create_reset_password_dto_1.CreateResetPasswordDto) {
}
exports.UpdateResetPasswordDto = UpdateResetPasswordDto;
//# sourceMappingURL=update-reset_password.dto.js.map