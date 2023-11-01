const express = require("express");
const router = express.Router();
const {createComment, fetchAllComments} = require('../controllers/Comments');
const { validateToken } = require("../utils/Jwt");


router.post('/product/create-comment', validateToken, createComment)
router.get("/products/comments", fetchAllComments)

module.exports = router;