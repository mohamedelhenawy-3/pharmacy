const mongoose = require("mongoose");
const Joi = require("joi");

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

function validateAgainstErrors(medicine) {
  const schema = {
    name: Joi.string().max(255).required(),
    price: Joi.number().min(0).greater(0).required(),
    countInStock: Joi.number().min(0).required(),
    expiryDate: Joi.string().required(),
  };

  return Joi.validate(medicine, schema);
}

exports.Medicine = Medicine;
exports.validate = validateAgainstErrors;
