const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");


const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"1d"});
  return token;
}

module.exports = mongoose.model("user", userSchema);