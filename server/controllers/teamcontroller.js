const team = require("../models/team");
const Cloudinary = require("../config/cloudinary");

exports.addteam = async (req, res) => {
  const { name, post, profile, image } = req.body;

  if (!name || !post) {
    return res
      .status(400)
      .json({ err: "Name, post are required." });
  }
  try {
    const newteam = await team.create({
      name,
      post,
      profile: profile || "none",
      image: image || "none",
    });
    return res
      .status(200)
      .json({ msj: "Member created successfully", team: newteam });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: "Failed to create Member." });
  }
};

exports.allteam = async (req, res) => {
  const verif = req.body;
  if (verif) {
    try {
      const teams = await team.find({});
      if (!teams) {
        return res.status(200).json({ msj: "no saved teams" });
      } else {
        return res.status(200).json({ teams });
      }
    } catch (error) {
      return res.status(400).json({ err: error });
    }
  } else {
    return res.status(400).json({ err: "error occured" });
  }
};

exports.deleteteam = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await team.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ err: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully", _id: id });
  } catch (error) {
    res.status(500).json({ err: "Failed to delete Member", error });
  }
};