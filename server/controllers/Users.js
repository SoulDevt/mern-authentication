const User = require('../models/user-schema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { createToken, validateToken } = require('../utils/Jwt');
const cookieParser = require("cookie-parser");
const Product = require('../models/product-model');

const login = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json('Email and password are required.');
        }
        try {
            const findUser = await User.findOne({ email: req.body.email });
            if (findUser) {
                const checkPassword = bcrypt.compareSync(req.body.password, findUser.password);
                if (checkPassword) {
                    // const token = await jwt.sign({ email: req.body.email, id: findUser._id }, process.env['JWT_SECRET_KEY'], { expiresIn: '1h' })
                    // res.json({ status: 'ok', token: token })
                    const token = await createToken(req.body.email, findUser._id);
                    res.cookie("access_token", token, {
                        maxAge: 60 * 60 * 24 * 30 * 1000,
                        httpOnly: true
                    })
                    // console.log(token)
                    res.json({status: "ok", email: req.body.email, id: findUser._id});
                    
                } else {
                    res.json({ error: 'bad credentials' });
                }
            } else {
                res.status(401).json({ error: 'User doesnt exist' });
            }
            // console.log(checkPassword);
            // const user = await User.findOne({ email: req.body.email, password: req.body.password });
    
            // if (user) {
            //     const token = await jwt.sign({ email: req.body.email, name: req.body.name }, process.env['JWT_SECRET_KEY'])
            //     res.json({ status: 'ok', token: token })
            // } else {
            //     res.json({ error: 'bad credentials' });
            // }
        } catch (error) {
            return console.error(error);
        }
}

const register = async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body;
    console.log(req.body)

    //check if there is email or password
    if (!email || !password) {
        return res.status(400).json('Email and password are required.');
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    try {
        const checkUser = await User.findOne({ email: email });
        console.log("resultat du check " + checkUser)
        if (checkUser) {
            return res.status(409).json('user already registered');
        } else {
            User.create({
                name: name,
                email: email,
                password: hashPassword
            });
            res.status(200).json('registred successfully');
        }
    } catch (error) {
        return res.json({ error: error });
    }

    //res.json('access to home root');
}

const showProfile = async (req, res) => {
    console.log("launched + " + req.params.email)
    try {
        const currentUser = await User.findOne({ email: req.params.email });
        console.log(currentUser)
        res.json({ email: req.params.email, name: currentUser.name });
    } catch (error) {
        console.log(error)
    }

    // const { email } = req.params.email;
    // console.log("email: " + email)
    // try {
    //     res.json(quote);
    // } catch (error) {
    //     return res.json({ error: error });
    // }

    //res.json('access to home root');
}

const editProfile = async (req, res) => {
    console.log("editprofile launched")

    try {
        // const splitToken = req.headers.authorization.split(' ')
        // const token = splitToken[1]
        // const decoded = jwt.verify(token, process.env['JWT_SECRET_KEY'])
        // console.log(decoded)
        //const email = decoded.email;
        // console.log(email)

        if (req.body.email) {
            if (req.body.password) {
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashPassword = bcrypt.hashSync(req.body.password, salt);
                await User.findOneAndUpdate({ email: req.params.email }, { name: req.body.name, email: req.body.email, password: hashPassword });
                res.status(200).json("Updated successfully")
            } else {
                await User.findOneAndUpdate({ email: req.params.email }, { name: req.body.name, email: req.body.email });
                res.status(200).json("Updated successfully")
            }
            
            //res.json({ email: req.params.email, name: currentUser.name });
        }
    } catch (error) {
        console.log(error)
    }
}

const findUserById = async (req, res) => {
    console.log("launched + " + req.params.id)
    try {
        const currentUser = await User.findOne({ _id: req.params.id });
        console.log(currentUser)
        res.json({ name: currentUser.name });
    } catch (error) {
        console.log(error)
    }
}

const logout = async (req, res) => {
    res.clearCookie('access_token').json({success: "logout successfully"})
}

const addToWishlist = async (req, res) => {
    const { userId, productId } = req.body;

    try {
      // Recherche de l'utilisateur par ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Recherche du produit par ID
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Vérifie si le produit est déjà dans la liste de souhaits de l'utilisateur
      const isProductInWishlist = user.wishlist.some((wishlistProduct) =>
        wishlistProduct.equals(product._id)
      );
  
      if (isProductInWishlist) {
        return res.json({ message: 'Product is already in the wishlist' });
      }
  
      // Ajout du produit à la liste de souhaits de l'utilisateur
      user.wishlist.push(product);
      await user.save();
  
      res.json({ message: 'Product added to the wishlist' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error while trying to add the product to your wishlist" });
    }
}

module.exports = {
    login,
    register,
    showProfile,
    editProfile,
    findUserById,
    logout,
    addToWishlist
}