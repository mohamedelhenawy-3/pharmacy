require("dotenv").config();

const express = require("express");

const database = require("./config/db");

database();

const app = express();

app.use(express.json());
//deal with rest api with urx
app.use(express.urlencoded({ extended: false }));

//pharmancy and patients
app.use("/api/pharmacies", require("./routes/pharmacies"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/auth", require("./routes/auth"));

//handle the error
app.use(require("./middelware/globalMiddleware"));

const port = process.env.PORT || 3000;
//the server run in diff ports
app.listen(port, () => {
  console.log(`the sever run in ${port}`);
});
