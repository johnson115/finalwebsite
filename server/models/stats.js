const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    type: { type: String, required: true },
    on: { type: String, required: true },
    nb: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("stat", blogSchema);
