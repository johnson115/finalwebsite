const express = require("express");
const app = express();

const router = require("./router");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", router);

require("./config/dbconnection");
app.listen(process.env.PORT, () =>
  console.log(`Working on port ${process.env.PORT}`)
);
