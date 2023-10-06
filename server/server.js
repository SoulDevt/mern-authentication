require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors');
const app = express()
const Product = require('./models/product-model')

//stripe
const stripe = require('stripe')('sk_test_51KNlxHJpM42GLk7JDZJE6bm5N9z6ddPmt0FFITEiNrtI4alKsbUMaGnbRHrIFZOQmyJccTlr6mRxTZUGsiSwWAVp00O5saZViu');
app.use(express.static('public'));

//end Stripe

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

//Stripe Routes
app.post('/checkout', async (req, res) => {
  const items = req.body

  // Créez un tableau pour stocker les line_items de Stripe
  const lineItems = [];

  for (const productId in items) {
    const quantity = items[productId];

    // Ajoutez l'élément au tableau lineItems avec la quantité spécifiée et l'ID du produit comme Price ID
    // lineItems.push({
    //   price: productId, // L'ID du produit est utilisé comme Price ID
    //   quantity: quantity,
    // });

    lineItems.push({
      price_data: {
        currency: 'usd',
        unit_amount: 3000,
        tax_behavior: "exclusive",
        product_data: {
          name: 'T-shirt',
          description: 'Comfortable cotton t-shirt',
          images: ['https://example.com/t-shirt.png'],
        },
        quantity: 1,
      }
    });
  }

  console.log(lineItems)
  


  const YOUR_DOMAIN = "http://localhost:5173/shop";
  const session = await stripe.checkout.sessions.create({
    // line_items: lineItems,
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: 3000,
        tax_behavior: "exclusive",
        product_data: {
          name: 'T-shirt',
          description: 'Comfortable cotton t-shirt',
          images: ['https://example.com/t-shirt.png'],
        },
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: {enabled: true},
  });

  res.redirect(303, session.url);
});


//End Stripe routes

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
