const user = require("../../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    let admin = await user.findOne({});
    if (!admin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin = await user.create({
        username,
        password: hashedPassword,
      });
      const token = admin.generateAuthToken();
      return res
        .status(200)
        .json({
          token,
          msj: "User Created Succesfuly, You will be redirected to Amdin page !",
        });
    } else {
      const pass = await bcrypt.compare(password, admin.password);
      const verifemail = admin.username === username;
      if (pass && verifemail) {
        const token = admin.generateAuthToken();
        return res
          .status(200)
          .json({
            token,
            msj: "Connected, You will be redirected to Amdin page !",
          });
      } else {
        return res
          .status(400)
          .json({ err: "Something went wrong. Please try again." });
      }
    }
  } catch (error) {
    return res.status(500).json({ err: "serveur error" });
  }
};

const changePass = async (req, res) => {
  const { actual, neww } = req.body;
  try {
    const admin = await user.findOne({});
    if (!admin) {
      return res.status(400).json({ err: "No User Found" });
    }
    const pass = await bcrypt.compare(actual, admin.password);
    if (pass) {
      const hashedPassword = await bcrypt.hash(neww, 10);
      const updateadmin = await user.findByIdAndUpdate(
        admin._id,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );
      if (!updateadmin) {
        return res.status(404).json({ err: "No Username found" });
      }
      return res.status(200).json({ msj: "password updated" });
    } else {
      return res.status(200).json({ err: "incorrect password" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ err: "Erreur serveur", details: error.message });
  }
};

const verify = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ err: "Authentication token missing" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await user.findById(decodedToken._id);
    if (!admin) {
      return res.status(404).json({ err: "User not found" });
    }
    res.status(200).json({ msj: "User authenticated", user: admin });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ err: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ err: "Invalid token" });
    } else {
      return res
        .status(500)
        .json({ err: "Server error during token verification" });
    }
  }
};
module.exports = { login, changePass, verify };
