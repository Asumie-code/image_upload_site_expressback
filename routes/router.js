const express = require("express");
const router = express.Router();

const posts = require('./posts');
const about = require('./about');
const authnticate = require('./authnticate');



router.use([posts, about, authnticate]);


module.exports = router;