const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    name: { type: String, required: true },
    post: { type: String, required: true },
    profile: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("team", blogSchema);