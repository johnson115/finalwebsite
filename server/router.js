const express = require("express")
const router = express.Router();
const blog = require("./controllers/blogscontroller");
const user = require("./controllers/auth/authController");

router.route("/").get(blog.tesst);
router.route("/login").post(user.login);


module.exports = router;