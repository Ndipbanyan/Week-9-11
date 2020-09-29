"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allInfoType = exports.staffType = exports.purchasedCarsType = exports.allCarsType = void 0;
const graphql_1 = require("graphql");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb://localhost/week-9", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
exports.allCarsType = new graphql_1.GraphQLObjectType({
    name: "allCars",
    fields: {
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
        productionDate: { type: graphql_1.GraphQLString },
        color: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
        amount: { type: graphql_1.GraphQLFloat },
        condition: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLFloat },
    },
});
exports.purchasedCarsType = new graphql_1.GraphQLObjectType({
    name: "purchasedCars",
    fields: {
        type: {
            type: graphql_1.GraphQLString,
        },
        modelNumber: {
            type: graphql_1.GraphQLString,
        },
        saleDate: {
            type: graphql_1.GraphQLString,
        },
        buyer: {
            type: graphql_1.GraphQLString,
        },
        color: {
            type: graphql_1.GraphQLString,
        },
    },
});
exports.staffType = new graphql_1.GraphQLObjectType({
    name: "staff",
    fields: {
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        salary: { type: graphql_1.GraphQLFloat },
        homeAddress: { type: graphql_1.GraphQLString },
    },
});
exports.allInfoType = new graphql_1.GraphQLObjectType({
    name: "allInfo",
    fields: {
        allCars: { type: new graphql_1.GraphQLList(exports.allCarsType) },
        purchase: { type: new graphql_1.GraphQLList(exports.purchasedCarsType) },
        staffs: { type: new graphql_1.GraphQLList(exports.staffType) },
    },
});
//# sourceMappingURL=graphqlSchema2.js.map