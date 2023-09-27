require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors');
const app = express()
const Product = require('./models/product-model')

//import users routes
const userRoutes = require('./routes/Users')

//import product routes
const productRoutes = require('./routes/Product')


//swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API de votre application',
      version: '1.0.0',
      description: 'Documentation de l\'API de votre application',
    },
  };

  const options = {
    swaggerDefinition,
    apis: ['server.js'], // Spécifiez le chemin vers le fichier contenant vos commentaires JSDoc
  };


  const swaggerSpec = swaggerJSDoc(options);
  
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  
  //End Swagger implementation


mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });



//middlewares
app.use(express.json());
app.use(cors());


  /**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     description: Connectez-vous en utilisant un email et un mot de passe valides.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 token:
 *                   type: string
 *       401:
 *         description: Mauvaises informations d'identification
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Bad credentials
 */

//users routes
app.use(userRoutes)
//product routes
app.use(productRoutes)

// app.post('/shop/create-product', async (req, res) => {
//   const { name, description, price, categories, img} = req.body;
//   console.log(name, description, price, categories,img);
//   try {
//     await Product.create(
//       {
//         name: name, 
//         description: description, 
//         price: price, 
//         category: categories, 
//         imageUrl: img}
//       )
//     res.status(200).json("Product created successfully")
//   } catch (error) {
//     console.log(error)
//   }
// })


app.listen('3001', () => {
    console.log("listening to port 3001")
})
