const express = require("express");
const router = express.Router();
const {createProduct, fetchAllProducts, fetchProductById} = require('../controllers/Products');
const { validateToken } = require("../utils/Jwt");


router.post('/shop/create-product', validateToken, createProduct)
router.get("/shop", fetchAllProducts)
router.get("/product/:id", fetchProductById)

module.exports = router;