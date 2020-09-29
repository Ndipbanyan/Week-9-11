"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePurchasedCars = exports.PurchasedCars = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const Schema = mongoose_1.default.Schema;
const purchasedCarsSchema = new Schema({
    type: String,
    modelNumber: String,
    saleDate: String,
    buyer: String,
    color: String
});
function validatePurchasedCars(organ) {
    const schema = joi_1.default.object({
        type: joi_1.default.string().min(5).max(50).required(),
        modelNumber: joi_1.default.array().items(joi_1.default.string().min(5).max(50)).required(),
        saleDate: joi_1.default.string().required(),
        buyer: joi_1.default.string().required(),
        color: joi_1.default.string().min(5).max(50).required()
    });
    return schema.validate(organ);
}
exports.validatePurchasedCars = validatePurchasedCars;
;
const PurchasedCars = mongoose_1.default.model('PurchasedCar', purchasedCarsSchema);
exports.PurchasedCars = PurchasedCars;
//# sourceMappingURL=purchasedCars.js.map