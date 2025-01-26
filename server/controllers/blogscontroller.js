const blog = require("../models/blogsmodel");
const Cloudinary = require("../config/cloudinary");

exports.addblog = async (req, res) => {
  const { title, tag, description, image } = req.body;

  if (!title || !tag || !description) {
    return res
      .status(400)
      .json({ err: "Title, tag, and description are required." });
  }
  try {
    const newBlog = await blog.create({
      title,
      tag,
      description,
      image: image || "none",
    });
    return res
      .status(200)
      .json({ msj: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: "Failed to create blog." });
  }
};

exports.allblogs = async (req, res) => {
  const verif = req.body;
  if (verif) {
    try {
      const blogs = await blog.find({});
      if (!blogs) {
        return res.status(200).json({ msj: "no saved blogs" });
      } else {
        return res.status(200).json({ blogs });
      }
    } catch (error) {
      return res.status(400).json({ err: error });
    }
  } else {
    return res.status(400).json({ err: "error occured" });
  }
};

exports.deleteblog = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await blog.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ err: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully", _id: id });
  } catch (error) {
    res.status(500).json({ err: "Failed to delete blog", error });
  }
};
