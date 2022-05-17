//Lodash for mapping
const _ = require("lodash");

const { Medicine, validate } = require("../models/medicine");
const asyncHandler = require("express-async-handler");

//get api/tickets
//get all medicines
const getMedicines = asyncHandler(async (req, res) => {
  //it's called medicines not midicine
  res.status(200).send(await Medicine.find());
  //  res.send(medicine);
});

const getMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);

  if (!medicine) return res.status(404).send("Medicine not found!");

  res.status(200).send(medicine);
});

//post /api/pharmacy/:id
const postMedicine = asyncHandler(async (req, res) => {
  // const result = validate(req.body);
  // if (result) return res.status(400).send(result.error.details[0].message);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // let medicine = new Medicine({
  //   name: req.body.name,
  //   price: req.body.price,
  //   countInStock: req.body.countInStock,
  //   expiryDate: req.body.expiryDate,
  // });

  let medicine = new Medicine(
    _.pick(req.body, ["name", "price", "countInStock", "expiryDate"])
  );

  //untill now we talk the object but did not save it

  medicine = await medicine.save(); //save it in db

  res.status(201).send(medicine);
});

//put
const updateMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);
  if (!medicine) return res.status(404).send("the medicne doesnt exist");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updateMedicine = await Medicine.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(201).send(updateMedicine);
});

const deleteMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findByIdAndRemove(req.params.id);

  if (!medicine) return res.status(404).send("the medicne does not exist");

  res.status(204).send("Deleted sucesfully");
});

module.exports = {
  getMedicines,
  getMedicine,
  postMedicine,
  updateMedicine,
  deleteMedicine,
};
