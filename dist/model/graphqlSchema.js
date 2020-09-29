"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Org = __importStar(require("../model/schema"));
const orgModel = Org.Org;
const orgType = new graphql_1.GraphQLObjectType({
    name: "org",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        organization: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
        products: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        marketValue: { type: graphql_1.GraphQLInt },
        address: { type: graphql_1.GraphQLString },
        ceo: { type: graphql_1.GraphQLString },
        country: { type: graphql_1.GraphQLString },
        noOfEmployees: { type: graphql_1.GraphQLInt },
        employees: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    }),
});
// GET SINGLE ORGANIZATION BY ID
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        oneOrganization: {
            type: orgType,
            args: { id: { type: graphql_1.GraphQLID } },
            async resolve(parent, args) {
                return await orgModel.findById(args.id);
            },
        },
        // GET ALL ORGANIZATION
        allOrganizations: {
            type: new graphql_1.GraphQLList(orgType),
            args: {},
            resolve(_parent, _args) {
                return orgModel.find();
            },
        },
    },
});
// POST MUTATION
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addOrganization: {
            type: orgType,
            args: {
                organization: { type: graphql_1.GraphQLString },
                products: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
                marketValue: { type: graphql_1.GraphQLString },
                address: { type: graphql_1.GraphQLString },
                ceo: { type: graphql_1.GraphQLString },
                country: { type: graphql_1.GraphQLString },
                noOfEmployees: { type: graphql_1.GraphQLInt },
                employees: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
            },
            async resolve(parent, args) {
                try {
                    args.noOfEmployees = args.employees.length;
                    // validate here
                    //     const { error, value } = Org.joiValidation(args);
                    // if (error) {
                    //       return (error.details[0].message);
                    // }
                    let organization = new orgModel(args);
                    console.log(organization);
                    return await organization.save();
                }
                catch {
                    (err) => { };
                }
            },
        },
        // UPDATE
        updateOrganization: {
            type: orgType,
            args: {
                id: { type: graphql_1.GraphQLID },
                organization: { type: graphql_1.GraphQLString },
                products: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
                marketValue: { type: graphql_1.GraphQLInt },
                address: { type: graphql_1.GraphQLString },
                ceo: { type: graphql_1.GraphQLString },
                country: { type: graphql_1.GraphQLString },
                noOfEmployees: { type: graphql_1.GraphQLInt },
                employees: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
            },
            async resolve(parent, args) {
                try {
                    const { id, ...others } = args;
                    others.noOfEmployees = others.employees.length;
                    const result = await orgModel.findByIdAndUpdate(id, others, {
                        new: true,
                    });
                    return result;
                }
                catch {
                    (err) => {
                        console.log(err.message);
                    };
                }
            },
        },
        // delete
        deleteOrganization: {
            type: orgType,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            async resolve(parent, args) {
                try {
                    const { id } = args;
                    const result = await orgModel.findByIdAndRemove(id);
                    return result;
                }
                catch {
                    (err) => {
                        console.log(err.message);
                    };
                }
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
//# sourceMappingURL=graphqlSchema.js.map