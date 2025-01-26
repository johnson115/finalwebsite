const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    type: { type: String, required: true },
    value: { type: Number, required: true },
    to: { type: String, required: true },
    benefits: { type: Number, required: true },
    note: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("transaction", blogSchema);