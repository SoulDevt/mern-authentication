const express = require("express");
const router = express.Router();
const {login, register, showProfile, editProfile, findUserById, logout, addToWishlist, getWishlist, updateWishlist} = require('../controllers/Users');
const { validateToken } = require("../utils/Jwt");

router.post('/login', login);
router.get('/logout', logout);
router.post('/register', register);
router.get('/users/:email', validateToken, showProfile);
router.put('/users/:email', validateToken, editProfile);
// router.get('/users/infos/:id', validateToken, findUserById);
router.get('/users/infos/:id', findUserById);
router.post('/wishlist/add', validateToken, addToWishlist);
router.get('/wishlist/:userId', validateToken, getWishlist);
router.put('/wishlist/:productId', validateToken, updateWishlist);

module.exports = router;