const express = require("express")
const router = express.Router();
const blog = require("./controllers/blogscontroller");
const user = require("./controllers/auth/authController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


//auth routes
router.route("/").get(blog.addblog);
router.route("/login").post(user.login);
router.route("/verif").post(user.verify);


//blogs routes
router.route("/addblog").post(blog.addblog);
router.route("/allblogs").post(blog.allblogs);
router.route("/deleteblog/:id").delete(blog.deleteblog);

//image route
router.route("/addblog").post(upload.single("image"), blog.addblog);



module.exports = router;