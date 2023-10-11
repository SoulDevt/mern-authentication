const express = require("express");
const router = express.Router();
const {createComment, fetchAllComments} = require('../controllers/Comments');


router.post('/product/create-comment', createComment)
router.get("/products/comments", fetchAllComments)

module.exports = router;