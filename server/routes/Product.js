const express = require("express");
const router = express.Router();
const {createProduct, fetchAllProducts, fetchProductById} = require('../controllers/Products');


router.post('/shop/create-product', createProduct)
router.get("/shop", fetchAllProducts)
router.get("/product/:id", fetchProductById)

module.exports = router;