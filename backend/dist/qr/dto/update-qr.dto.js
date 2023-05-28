"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQrDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_qr_dto_1 = require("./create-qr.dto");
class UpdateQrDto extends (0, mapped_types_1.PartialType)(create_qr_dto_1.CreateQrDto) {
}
exports.UpdateQrDto = UpdateQrDto;
//# sourceMappingURL=update-qr.dto.js.map