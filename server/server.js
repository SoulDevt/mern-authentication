require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/user-schema')
const express = require('express')
const cors = require('cors');
const app = express()
const jwt = require('jsonwebtoken')

//console.log("uri est: " + process.env['MONGO_URI'])
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());



app.post('/login', async (req, res) => {
    try {
         const user = await User.findOne({ email: req.body.email, password: req.body.password });
        if(user) {
            const token = await jwt.sign({ email: req.body.email, name: req.body.name }, "secret123")
            res.json({status: 'ok', token: token})
        } else {
            res.json({error: 'bad credentials'});
        }
    } catch (error) {
        return console.error(error);
    }
    
});

app.post('/register', async (req, res) => {
    console.log(req.body)
    const {name, email, password} = req.body;
    //console.log("nom: " + name)
    try {
        const checkUser = await User.findOne({email: email});
        console.log("resultat du check " + checkUser)
        if(checkUser) {
            res.json('user already registered');
        } else {
            User.create({
                name: name,
                email: email,
                password: password
            });
            res.json('registred successfully');
        }
    } catch (error) {
        return res.json({error: error});
    }

    //res.json('access to home root');
});


app.listen('3001', () => {
    console.log("listening to port 3001")
})