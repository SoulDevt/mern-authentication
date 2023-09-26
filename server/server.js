require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors');
const app = express()
//import users routes
const userRoutes = require('./routes/Users')


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

  
  
// app.post('/login', async (req, res) => {
//     // const saltRounds = 10;
//     // const salt = bcrypt.genSaltSync(saltRounds);
//     //const hashPassword = bcrypt.hashSync(req.body.password, salt);
//     // console.log(checkUser.password)
//     try {
//         const findUser = await User.findOne({ email: req.body.email });
//         if (findUser) {
//             const checkPassword = bcrypt.compareSync(req.body.password, findUser.password);
//             if (checkPassword) {
//                 const token = await jwt.sign({ email: req.body.email }, "secret123")
//                 res.json({ status: 'ok', token: token })
//             } else {
//                 res.json({ error: 'bad credentials' });
//             }
//         } else {
//             res.status(401).json({ error: 'User doesnt exist' });
//         }
//         // console.log(checkPassword);
//         // const user = await User.findOne({ email: req.body.email, password: req.body.password });

//         // if (user) {
//         //     const token = await jwt.sign({ email: req.body.email, name: req.body.name }, "secret123")
//         //     res.json({ status: 'ok', token: token })
//         // } else {
//         //     res.json({ error: 'bad credentials' });
//         // }
//     } catch (error) {
//         return console.error(error);
//     }

// });

// app.post('/register', async (req, res) => {
//     console.log(req.body)
//     const { name, email, password } = req.body;
//     //console.log("nom: " + name)
//     const saltRounds = 10;
//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hashPassword = bcrypt.hashSync(password, salt);
//     try {
//         const checkUser = await User.findOne({ email: email });
//         console.log("resultat du check " + checkUser)
//         if (checkUser) {
//             return res.status(409).json('user already registered');
//         } else {
//             User.create({
//                 name: name,
//                 email: email,
//                 password: hashPassword
//             });
//             res.status(200).json('registred successfully');
//         }
//     } catch (error) {
//         return res.json({ error: error });
//     }

//     //res.json('access to home root');
// });

// app.get('/users/:email', async (req, res) => {
//     console.log("launched + " + req.params.email)
//     try {
//         const currentUser = await User.findOne({ email: req.params.email });
//         console.log(currentUser)
//         res.json({ email: req.params.email, name: currentUser.name });
//     } catch (error) {
//         console.log(error)
//     }

//     // const { email } = req.params.email;
//     // console.log("email: " + email)
//     // try {
//     //     res.json(quote);
//     // } catch (error) {
//     //     return res.json({ error: error });
//     // }

//     //res.json('access to home root');
// });

// app.put('/users/:email', async (req, res) => {
//     console.log("launched")
//     try {
//         // const currentUser = await User.findOne({ email: req.params.email });
//         // console.log(req.headers.authorization)
//         const splitToken = req.headers.authorization.split(' ')
//         const token = splitToken[1]
//         const decoded = jwt.verify(token, 'secret123')
//         console.log(decoded)
//         //const email = decoded.email;
//         // console.log(email)
//         if (decoded.email) {
//             if (req.body.password) {
//                 const saltRounds = 10;
//                 const salt = bcrypt.genSaltSync(saltRounds);
//                 const hashPassword = bcrypt.hashSync(req.body.password, salt);
//                 await User.findOneAndUpdate({ email: req.params.email }, { name: req.body.name, email: req.body.email, password: hashPassword });
//                 console.log("Updated successfully")
//             } else {
//                 await User.findOneAndUpdate({ email: req.params.email }, { name: req.body.name, email: req.body.email });
//                 console.log("Updated successfully")
//             }
            
//             //res.json({ email: req.params.email, name: currentUser.name });
//         }
//     } catch (error) {
//         console.log(error)
//     }

//     // const { email } = req.params.email;
//     // console.log("email: " + email)
//     // try {
//     //     res.json(quote);
//     // } catch (error) {
//     //     return res.json({ error: error });
//     // }

//     //res.json('access to home root');
// });

//users routes
app.use(userRoutes)


app.listen('3001', () => {
    console.log("listening to port 3001")
})
