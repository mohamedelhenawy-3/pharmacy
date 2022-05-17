const express = require("express");
const auth = require("../middelware/authMiddleware");
const admin = require("../middelware/adminMiddlware");
const router = express.Router();
const {
  getMedicines,
  getMedicine,
  postMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/pharmaciesController");

//create read update delete
router.get("/", getMedicines); //read all
router.get("/:id", getMedicine); //read one medicine
router.post("/", auth, postMedicine); //create one
router.put("/:id", auth, updateMedicine); //update one
router.delete("/:id", [auth, admin], deleteMedicine); //delete one

module.exports = router;
