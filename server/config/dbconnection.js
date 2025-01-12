const { error } = require("console");
const mongoose = require("mongoose");
require("dotenv").config();



mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to DB"))
  .catch((error) => console.log("Eurrer of DB Connection : ", error));
