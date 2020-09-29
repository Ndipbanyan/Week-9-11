"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffInfo = exports.purchaseInfo = exports.carInfo = exports.Org = exports.joiValidation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const organizationSchema = new mongoose_1.default.Schema({
    organization: {
        type: String,
        required: true,
        unique: true,
    },
    marketValue: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    ceo: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    products: {
        type: [String],
        required: true,
    },
    employees: {
        type: [String],
        required: true,
    },
    noOfEmployees: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
function joiValidation(details) {
    const schema = joi_1.default.object({
        organization: joi_1.default.string().min(4).max(20).required().trim(),
        marketValue: joi_1.default.string().min(3).required(),
        address: joi_1.default.string().min(10).max(200).required(),
        ceo: joi_1.default.string().min(2).max(20).required(),
        country: joi_1.default.string().required(),
        products: joi_1.default.array().items(joi_1.default.string()).required(),
        employees: joi_1.default.array().items(joi_1.default.string()).required(),
    });
    return schema.validate(details, {
        abortEarly: false,
    });
}
exports.joiValidation = joiValidation;
exports.Org = mongoose_1.default.model("Organization", organizationSchema);
// Task2 Schema
const allCars = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    productionDate: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
exports.carInfo = mongoose_1.default.model("allCar", allCars);
const purchasedCars = new mongoose_1.default.Schema({
    type: String,
    modelNumber: String,
    saleDDate: String,
    buyer: String,
    color: String,
});
exports.purchaseInfo = mongoose_1.default.model("purchasedCar", purchasedCars);
const staff = new mongoose_1.default.Schema({
    name: String,
    position: String,
    salary: Number,
    homeAddress: String,
});
exports.staffInfo = mongoose_1.default.model("staffInfo", staff);
//# sourceMappingURL=schema.js.map