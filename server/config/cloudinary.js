require("dotenv").config();
const cloudinary = require("cloudinary").v2;

module.exports = class cloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  static async uploadImage(imagePath) {
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "digital",
      });
      return {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } catch (e) {
      console.error("Error uploading to Cloudinary:", e.message);
      throw new Error(e.message);
    }
  }
};
