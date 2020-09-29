import mongoose from "mongoose";
import Joi from "joi";

const organizationSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export function joiValidation(details: Record<string, unknown>) {
  const schema = Joi.object({
    organization: Joi.string().min(4).max(20).required().trim(),

    marketValue: Joi.string().min(3).required(),
    address: Joi.string().min(10).max(200).required(),
    ceo: Joi.string().min(2).max(20).required(),
    country: Joi.string().required(),
    products: Joi.array().items(Joi.string()).required(),
    employees: Joi.array().items(Joi.string()).required(),
  });
  return schema.validate(details, {
    abortEarly: false,
  });
}

export const Org = mongoose.model("Organization", organizationSchema);
 

// Task2 Schema

const allCars = new mongoose.Schema({
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

export const carInfo = mongoose.model("allCar", allCars);

const purchasedCars = new mongoose.Schema({
  type: String,
  modelNumber: String,
  saleDDate: String,
  buyer: String,
  color: String,
});

export const purchaseInfo = mongoose.model("purchasedCar", purchasedCars);

const staff = new mongoose.Schema({
  name: String,
  position: String,
  salary: Number,
  homeAddress: String,
});

export const staffInfo = mongoose.model("staffInfo", staff);


