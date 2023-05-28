"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.storage = (0, multer_1.diskStorage)({
    destination: './uploads',
    filename: (req, file, callback) => {
        console.log('file', file);
        callback(null, generateFilename(file));
    },
});
function generateFilename(file) {
    return `${Date.now()}_image_${(0, path_1.extname)(file.originalname)}`;
}
//# sourceMappingURL=multer.config.js.map