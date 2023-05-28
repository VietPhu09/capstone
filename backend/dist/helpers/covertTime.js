"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTime = void 0;
const convertTime = (day) => {
    let dateString = day;
    let dateParts = dateString.split('-');
    let newDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
    return newDate;
};
exports.convertTime = convertTime;
//# sourceMappingURL=covertTime.js.map