const express = require("express");
const router = express.Router();
const {createProduct} = require('../controllers/Products');


router.post('/shop/create-product', createProduct)

module.exports = router;