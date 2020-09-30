"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
// import { response } from "express";
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../app"));
const request = supertest_1.default(app_1.default);
describe("/", () => {
    it("can get correctly", (done) => {
        return request
            .post("/graphql")
            .send({
            query: `
      query{
        oneOrganization(id:"5f6f72d0d70a8a5484a299f5"){
          organization,
          employees,
          noOfEmployees,
        }
      }  
      `,
        })
            .then((res) => {
            console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
describe("/", () => {
    it("can get correctly", (done) => {
        return request
            .post("/graphql")
            .send({
            query: `
      query{
        allOrganizations{
          employees
        }
      }  
      `,
        })
            .then((res) => {
            console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
describe("/", () => {
    it("can get correctly", (done) => {
        return request
            .post("/graphql")
            .send({
            query: `
      mutation{
        addOrganization(
        organization: "Agnes Inc"
         products: ["beetles"]
         marketValue:"8"
         address: "Maitamz"
        ceo: "Oyinkan"
        country: "India"
        employees: ["Stalion"]
        ){
          country
        }
      }  
      `,
        })
            .then((res) => {
            console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
describe("/", () => {
    it("can get correctly", (done) => {
        return request
            .post("/graphql")
            .send({
            query: `
      mutation{
        updateOrganization(
          id:"5f60cdc576fd80bb110af5a3",
          country:"Plateau",
          ){
          country
        }
      }  
      `,
        })
            .then((res) => {
            console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
describe("/", () => {
    it("can get correctly", (done) => {
        return request
            .post("/graphql")
            .send({
            query: `
      mutation{
        deleteOrganization(id:"5f60cdc576fd80bb110af5a3"){
          country,
          id
        }
      }  
      `,
        })
            .then((res) => {
            console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
afterAll((done) => {
    mongoose_1.default.connection.close();
    done();
});
//# sourceMappingURL=organisation.test.js.map