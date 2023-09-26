const express = require("express");
const router = express.Router();
const {login, register, showProfile, editProfile} = require('../controllers/Users')

router.post('/login', login);
router.post('/register', register);
router.get('/users/:email', showProfile);
router.put('/users/:email', editProfile);

module.exports = router;