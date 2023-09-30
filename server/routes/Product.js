const express = require("express");
const router = express.Router();
const {createProduct, fetchAllProducts} = require('../controllers/Products');


router.post('/shop/create-product', createProduct)
router.get("/shop", fetchAllProducts)

module.exports = router;