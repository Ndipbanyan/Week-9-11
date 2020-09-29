import { HttpError } from "http-errors";
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLString,
} from "graphql";
import * as Org from "../model/schema";

const orgModel = Org.Org;

const orgType = new GraphQLObjectType({
  name: "org",
  fields: () => ({
    id: { type: GraphQLID },
    organization: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    products: { type: new GraphQLList(GraphQLString) },
    marketValue: { type: GraphQLInt },
    address: { type: GraphQLString },
    ceo: { type: GraphQLString },
    country: { type: GraphQLString },
    noOfEmployees: { type: GraphQLInt },
    employees: { type: new GraphQLList(GraphQLString) },
  }),
});
// GET SINGLE ORGANIZATION BY ID
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    oneOrganization: {
      type: orgType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await orgModel.findById(args.id);
      },
    },
    // GET ALL ORGANIZATION
    allOrganizations: {
      type: new GraphQLList(orgType),
      args: {},
      resolve(_parent, _args) {
        return orgModel.find();
      },
    },
  },
});
// POST MUTATION
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOrganization: {
      type: orgType,
      args: {
        organization: { type: GraphQLString },
        products: { type: new GraphQLList(GraphQLString) },
        marketValue: { type: GraphQLString },
        address: { type: GraphQLString },
        ceo: { type: GraphQLString },
        country: { type: GraphQLString },
        noOfEmployees: { type: GraphQLInt },
        employees: { type: new GraphQLList(GraphQLString) },
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
        } catch {
          (err: HttpError) => {};
        }
      },
    }, //END OF POST

    // UPDATE
    updateOrganization: {
      type: orgType,
      args: {
        id: { type: GraphQLID },
        organization: { type: GraphQLString },
        products: { type: new GraphQLList(GraphQLString) },
        marketValue: { type: GraphQLInt },
        address: { type: GraphQLString },
        ceo: { type: GraphQLString },
        country: { type: GraphQLString },
        noOfEmployees: { type: GraphQLInt },
        employees: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, args) {
        try {
          const { id, ...others } = args;
          others.noOfEmployees = others.employees.length;

          const result = await orgModel.findByIdAndUpdate(id, others, {
            new: true,
          });

          return result;
        } catch {
          (err: HttpError) => {
            console.log(err.message);
          };
        }
      },
    }, //END OF UPDATE

    // delete
    deleteOrganization: {
      type: orgType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        try {
          const { id } = args;

          const result = await orgModel.findByIdAndRemove(id);

          return result;
        } catch {
          (err: HttpError) => {
            console.log(err.message);
          };
        }
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
