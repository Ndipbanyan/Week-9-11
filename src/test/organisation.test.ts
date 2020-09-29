
import supertest from "supertest";
// import { response } from "express";
import mongoose from "mongoose"
import app from "../app";
const request = supertest(app);



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
  return  request
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
  return  request
      .post("/graphql")
      .send({
        query: `
      mutation{
        deleteOrganization(id:"5f60cdc576fd80bb110af5a3"){
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
afterAll((done) => {
    mongoose.connection.close();
    done();
})