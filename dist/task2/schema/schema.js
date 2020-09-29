"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const allCars_1 = require("../models/allCars");
const purchasedCars_1 = require("../models/purchasedCars");
const staff_1 = require("../models/staff");
const graphql_1 = require("graphql");
const PurchasedCarsType = new graphql_1.GraphQLObjectType({
    name: 'PurchasedCars',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        type: { type: graphql_1.GraphQLString },
        modelNumber: { type: graphql_1.GraphQLString },
        saleDate: { type: graphql_1.GraphQLString },
        buyer: { type: graphql_1.GraphQLString },
        color: { type: graphql_1.GraphQLString }
    })
});
const AllCarsType = new graphql_1.GraphQLObjectType({
    name: 'AllCars',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
        productionDate: { type: graphql_1.GraphQLString },
        color: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
        amount: { type: graphql_1.GraphQLInt },
        condition: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt }
    })
});
const StaffType = new graphql_1.GraphQLObjectType({
    name: 'Staffs',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        salary: { type: graphql_1.GraphQLInt },
        homeAddress: { type: graphql_1.GraphQLString }
    })
});
const allDataType = new graphql_1.GraphQLObjectType({
    name: 'AllData',
    fields: () => ({
        purchased: { type: graphql_1.GraphQLList(PurchasedCarsType) },
        allCar: { type: graphql_1.GraphQLList(AllCarsType) },
        staffs: { type: graphql_1.GraphQLList(StaffType) }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        purchasedCar: {
            type: new graphql_1.GraphQLList(PurchasedCarsType),
            args: {
                type: { type: graphql_1.GraphQLID },
                color: { type: graphql_1.GraphQLID },
            },
            resolve(parent, args) {
                return purchasedCars_1.PurchasedCars.find({
                    $or: [
                        { type: args.type },
                        { color: args.color }
                    ]
                });
            }
        },
        allCar: {
            type: new graphql_1.GraphQLList(AllCarsType),
            args: {
                type: { type: graphql_1.GraphQLID },
                condition: { type: graphql_1.GraphQLID },
                price: { type: graphql_1.GraphQLID }
            },
            resolve(parent, args) {
                return allCars_1.AllCars.find({
                    $or: [
                        { type: args.type },
                        { condition: args.condition },
                        { price: args.price }
                    ]
                });
            }
        },
        staff: {
            type: new graphql_1.GraphQLList(StaffType),
            args: {
                name: { type: graphql_1.GraphQLID },
                position: { type: graphql_1.GraphQLID },
            },
            resolve(parent, args) {
                return staff_1.Staff.find({
                    $or: [
                        { name: args.name },
                        { position: args.position }
                    ]
                });
            }
        },
        purchasedCars: {
            type: new graphql_1.GraphQLList(PurchasedCarsType),
            resolve(parent, args) {
                return purchasedCars_1.PurchasedCars.find({});
            }
        },
        allCars: {
            type: new graphql_1.GraphQLList(AllCarsType),
            resolve(parent, args) {
                return allCars_1.AllCars.find({});
            }
        },
        staffs: {
            type: new graphql_1.GraphQLList(StaffType),
            resolve(parent, args) {
                return staff_1.Staff.find({});
            }
        },
        allDatas: {
            type: allDataType,
            resolve(parent, args) {
                const purchased = purchasedCars_1.PurchasedCars.find({});
                const allCar = allCars_1.AllCars.find({});
                const staffs = staff_1.Staff.find({});
                const allDetails = { purchased, allCar, staffs };
                return allDetails;
            }
        }
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPurchasedCar: {
            type: PurchasedCarsType,
            args: {
                type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                modelNumber: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                saleDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                buyer: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                color: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args) {
                const { error } = purchasedCars_1.validatePurchasedCars(args);
                if (error)
                    throw new Error(error.details[0].message);
                let purchasedCar = new purchasedCars_1.PurchasedCars({
                    type: args.type,
                    modelNumber: args.modelNumber,
                    saleDate: args.saleDate,
                    buyer: args.buyer,
                    color: args.color,
                });
                return purchasedCar.save();
            }
        },
        addAllCar: {
            type: AllCarsType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                productionDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                color: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLList(graphql_1.GraphQLString)) },
                amount: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                condition: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                price: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
            },
            resolve(parent, args) {
                const { error } = allCars_1.validateAllCars(args);
                if (error)
                    throw new Error(error.details[0].message);
                let allCars = new allCars_1.AllCars({
                    name: args.name,
                    type: args.type,
                    productionDate: args.productionDate,
                    color: args.color,
                    amount: args.amount,
                    condition: args.condition,
                    price: args.price
                });
                return allCars.save();
            }
        },
        addStaffs: {
            type: StaffType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                position: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                salary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                homeAddress: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args) {
                const { error } = staff_1.validateStaff(args);
                if (error)
                    throw new Error(error.details[0].message);
                let staffs = new staff_1.Staff({
                    name: args.name,
                    position: args.position,
                    salary: args.salary,
                    homeAddress: args.homeAddress
                });
                return staffs.save();
            }
        },
        updatePurchasedCar: {
            type: PurchasedCarsType,
            args: {
                id: { type: graphql_1.GraphQLID },
                type: { type: graphql_1.GraphQLString },
                modelNumber: { type: graphql_1.GraphQLString },
                saleDate: { type: graphql_1.GraphQLString },
                buyer: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLString },
            },
            async resolve(parent, args) {
                let purchasedCar = await purchasedCars_1.PurchasedCars.findById(args.id);
                return purchasedCars_1.PurchasedCars.findOneAndUpdate(args.id, {
                    $set: {
                        type: args.type,
                        modelNumber: args.modelNumber,
                        saleDate: args.saleDate,
                        buyer: args.buyer,
                        color: args.color
                    }
                }, { new: true });
            }
        },
        updateAllCar: {
            type: AllCarsType,
            args: {
                id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                type: { type: graphql_1.GraphQLString },
                productionDate: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                amount: { type: graphql_1.GraphQLInt },
                condition: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLInt }
            },
            async resolve(parent, args) {
                let allCar = await purchasedCars_1.PurchasedCars.findById(args.id);
                return purchasedCars_1.PurchasedCars.findOneAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        type: args.type,
                        productionDate: args.productionDate,
                        color: args.color,
                        amount: args.amount,
                        condition: args.condition,
                        price: args.price
                    }
                }, { new: true });
            }
        },
        updateStaff: {
            type: StaffType,
            args: {
                id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                position: { type: graphql_1.GraphQLString },
                salary: { type: graphql_1.GraphQLInt },
                homeAddress: { type: graphql_1.GraphQLString }
            },
            async resolve(parent, args) {
                let staff = await staff_1.Staff.findById(args.id);
                return staff_1.Staff.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        position: args.position,
                        salary: args.salary,
                        homeAddress: args.homeAddress
                    }
                }, { new: true });
            }
        },
    }
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
exports.schema = schema;
//# sourceMappingURL=schema.js.map