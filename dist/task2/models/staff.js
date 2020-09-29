"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStaff = exports.Staff = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const Schema = mongoose_1.default.Schema;
const staffSchema = new Schema({
    name: String,
    position: String,
    salary: Number,
    homeAddress: String,
});
function validateStaff(organ) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(50).required(),
        position: joi_1.default.string().min(5).max(50).required(),
        salary: joi_1.default.number().min(3).max(50).required(),
        homeAddress: joi_1.default.string().min(5).max(50).required()
    });
    return schema.validate(organ);
}
exports.validateStaff = validateStaff;
;
const Staff = mongoose_1.default.model('Staff', staffSchema);
exports.Staff = Staff;
//# sourceMappingURL=staff.js.map