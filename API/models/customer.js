const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 0,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 0,
    max: 255,
  },
  phoneNumber: {
    type: String,
    required: true,
    length: 11,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 1,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1500,
  },
  isAdmin: Boolean,
});

customerSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, "privateKey"); //returns token
};

const Customer = mongoose.model("Customer", customerSchema);

function validateAgainstErrors(customer) {
  const schema = {
    firstName: Joi.string().min(0).max(255).required(),
    lastName: Joi.string().min(0).max(255).required(),
    phoneNumber: Joi.string()
      .length(11)
      .regex(/^01[0125][0-9]{8}$/gm)
      .required(),
    email: Joi.string().min(1).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateAgainstErrors;
