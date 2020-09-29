const  mongoose  = require("mongoose")
const  { MongoMemoryServer }  = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();



const connect = async () => {
  const uri = await mongod.getConnectionString();

  const mongooseOpts = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

const organizationSchema = new mongoose.Schema(
  {
    organization: {
      type: String,
      required: true,
      unique: true,
    },

    products: {
      type: [String],
      required: true,
    },
    employees: {
      type: [String],
      required: true,
    },

    marketValue: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    noOfEmployees: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Org = mongoose.model("Organization", organizationSchema);

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

// const productService = from ("../src/services/product");


/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await connect());

/**
 * Clear all test data after every test.
 */
// afterEach(async () => await clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await closeDatabase());

/**
 * Product test suite.
 */
describe("organization ", () => {
  /**
   * Tests that a valid product can be created through the productService without throwing any errors.
   */
  it("can be created correctly", async () => {
    expect(async () => await Org.create(data)).not.toThrow();
  });
});     

/**
 * Complete product example.
 */
const data = {
  products: ["petty", "malixious"],
  employees: ["Retnan", "peret", "procter"],
  organization: "Plural",
  address: "No 22, geeky Abiola street",
  country: "china",
  marketValue: "90%",
  noOfEmployees:7,
};

describe("organizatiion ", () => {
  /**
   * Tests that a valid product can be created through the productService without throwing any errors.
   */
  it("can get all organization", async () => {
    expect(async () => await Org.find({})).not.toThrow();
  });
});

describe("organization ", () => {
  /**
   * Tests that a valid product can be created through the productService without throwing any errors.
   */
  it("can be deleted successfully", async () => {
    expect(async () => await Org.findByIdAndRemove(Org.organization_id)).not.toThrow();
  });
});
describe("organization ", () => {
  /**
   * Tests that a valid product can be created through the productService without throwing any errors.
   */
  it("can be updated successfully", async () => {
    expect(
      async () => await Org.findByIdAndUpdate(Org.organization_id)
    ).not.toThrow();
  });
});

//API Testing with rest

// describe('organization requirement', () => {
//   it('creates an organization', () => {
//     return request(app)
//         .post('/')
//         .send({
//           "organization": "Agnes inc",
//           "ceo": "Agnes",
//           "Employees": ["Aisha", "Fana"],
//           "Products": ["dresses", "shoes", "bags"],
//           "country": "Marabat",
//           "address":"geek22, maitama"
//         }) 
//       .set('Accept', 'application/json')
//       .expect(200, {
//         data: {
//           "id":expect.any(String),
//           "organization": "Agnes inc",
//           "ceo": "Agnes",
//           "Employees": ["Aisha", "Fana"],
//           "Products": ["dresses", "shoes", "bags"],
//           "country": "Marabat",
//           "address": "geek22, maitama",
//           "createdAt":expect.any(String),
//           "updatedAt":expect.any(String)
        
//       }
        
//       }
//     )
//     })
// })






