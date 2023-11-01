const express = require("express");
const router = express.Router();
const {login, register, showProfile, editProfile, findUserById, logout} = require('../controllers/Users');
const { validateToken } = require("../utils/Jwt");

router.post('/login', login);
router.get('/logout', logout);
router.post('/register', register);
router.get('/users/:email', validateToken, showProfile);
router.put('/users/:email', validateToken, editProfile);
router.get('/users/infos/:id', validateToken, findUserById);

module.exports = router;