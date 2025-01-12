const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    subject: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("blog", blogSchema);