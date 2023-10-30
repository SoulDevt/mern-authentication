require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors');
const app = express()
const Product = require('./models/product-model')
const cookieParser = require('cookie-parser');

//stripe
const stripe = require('stripe')('sk_test_51KNlxHJpM42GLk7JDZJE6bm5N9z6ddPmt0FFITEiNrtI4alKsbUMaGnbRHrIFZOQmyJccTlr6mRxTZUGsiSwWAVp00O5saZViu');
app.use(express.static('public'));

//end Stripe

//import users routes
const userRoutes = require('./routes/Users')

//import products routes
const productRoutes = require('./routes/Product')

//import comments routes
const commentRoutes = require('./routes/Comment')


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
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));
app.use(cookieParser())


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
//product routes
app.use(commentRoutes)

//Stripe Routes
app.post('/checkout', async (req, res) => {
  try {
    console.log("launched checkout")
    const items = req.body
    const lineItems = []
  
    items.map((item) => {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })
    })
  
    console.log(lineItems)
  
    const YOUR_DOMAIN = "http://localhost:5173/";
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}checkout/success`,
      cancel_url: `${YOUR_DOMAIN}checkout/cancel`,
    });
  
    //res.redirect(303, session.url);
    console.log("url: " + session.url)
    res.json({url: session.url})
    
  } catch (error) {
    res.json({error: error})
  }
});
//End Stripe routes



app.listen('3001', () => {
    console.log("listening to port 3001")
})
