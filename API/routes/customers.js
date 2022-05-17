const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Customer, validate } = require("../models/customer");
const express = require("express");

const router = express.Router();

//register
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findOne({ email: req.body.email });
  if (customer) return res.status(400).send("Customer already exists!");

  customer = new Customer(
    _.pick(req.body, [
      "firstName",
      "lastName",
      "phoneNumber",
      "email",
      "password",
    ])
  );

  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(customer.password, salt);
  await customer.save();

  //For make the user register and created the token by the way
  res
    .header("x-auth-token", customer.generateAuthToken())
    .status(200)
    .send(_.pick(req.body, ["firstName", "lastName", "phoneNumber", "email"])); //send token
});

module.exports = router;
