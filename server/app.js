const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const router = require("./router");
const multer = require("multer")
const upload = multer({dest:"/upload"})
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use("/api", router);

require("./config/dbconnection");
app.listen(process.env.PORT, () =>
  console.log(`Working on port ${process.env.PORT}`)
);