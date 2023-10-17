const express = require("express");
const router = express.Router();
const {login, register, showProfile, editProfile, findUserById} = require('../controllers/Users')

router.post('/login', login);
router.post('/register', register);
router.get('/users/:email', showProfile);
router.put('/users/:email', editProfile);
router.get('/users/infos/:id', findUserById);

module.exports = router;