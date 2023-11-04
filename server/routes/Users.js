const express = require("express");
const router = express.Router();
const {login, register, showProfile, editProfile, findUserById, logout, addToWishlist} = require('../controllers/Users');
const { validateToken } = require("../utils/Jwt");

router.post('/login', login);
router.get('/logout', logout);
router.post('/register', register);
router.get('/users/:email', validateToken, showProfile);
router.put('/users/:email', validateToken, editProfile);
router.get('/users/infos/:id', validateToken, findUserById);
router.post('/wishlist/add', addToWishlist);

module.exports = router;