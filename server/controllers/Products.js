const Product = require('../models/product-model')

const createProduct = async (req, res) => {
    const { name, description, price, categories, img} = req.body;
    console.log(name, description, price, categories,img);
    try {
      await Product.create(
        {
          name: name, 
          description: description, 
          price: price, 
          category: categories, 
          imageUrl: img
        }
        )
      res.status(200).json("Product created successfully")
    } catch (error) {
      res.status((500)).json({ error: "Failed to create Product"})
    }
}

const fetchAllProducts = async (req, res) => {
    try {
        console.log("launched")
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "Failed to load products"})
    }
}

module.exports = {
    createProduct,
    fetchAllProducts
}