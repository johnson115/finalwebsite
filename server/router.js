const express = require("express")
const router = express.Router();
const blog = require("./controllers/blogscontroller");


router.route("/").get(blog.tesst);



module.exports = router;