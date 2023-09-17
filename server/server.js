require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/user-schema')
const express = require('express')
const cors = require('cors');
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//console.log("uri est: " + process.env['MONGO_URI'])
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());



app.post('/login', async (req, res) => {
    // const saltRounds = 10;
    // const salt = bcrypt.genSaltSync(saltRounds);
    //const hashPassword = bcrypt.hashSync(req.body.password, salt);
    // console.log(checkUser.password)
    try {
        const findUser = await User.findOne({ email: req.body.email });
        if(findUser) {
            const checkPassword = bcrypt.compareSync(req.body.password, findUser.password);
            if(checkPassword) {
                const token = await jwt.sign({ email: req.body.email}, "secret123")
                res.json({ status: 'ok', token: token })
            } else {
                res.json({ error: 'bad credentials' });
            }
        }
        // console.log(checkPassword);
        // const user = await User.findOne({ email: req.body.email, password: req.body.password });

        // if (user) {
        //     const token = await jwt.sign({ email: req.body.email, name: req.body.name }, "secret123")
        //     res.json({ status: 'ok', token: token })
        // } else {
        //     res.json({ error: 'bad credentials' });
        // }
    } catch (error) {
        return console.error(error);
    }

});

app.post('/register', async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body;
    //console.log("nom: " + name)
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    try {
        const checkUser = await User.findOne({ email: email });
        console.log("resultat du check " + checkUser)
        if (checkUser) {
            res.json('user already registered');
        } else {
            User.create({
                name: name,
                email: email,
                password: hashPassword
            });
            res.json('registred successfully');
        }
    } catch (error) {
        return res.json({ error: error });
    }

    //res.json('access to home root');
});

app.get('/users/:email', async (req, res) => {
    console.log("launched + " + req.params.email)
    try {
        const currentUser = await User.findOne({ email: req.params.email });
        console.log(currentUser)
        res.json({email: req.params.email, name: currentUser.name});
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
});

app.put('/users/:email', async (req, res) => {
    console.log("launched")
    try {
        // const currentUser = await User.findOne({ email: req.params.email });

        if(req.body.password) {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPassword = bcrypt.hashSync(req.body.password, salt);
            await User.findOneAndUpdate({ email: req.params.email }, {name: req.body.name, email: req.body.email, password: hashPassword});
        } else {
            await User.findOneAndUpdate({ email: req.params.email }, {name: req.body.name, email: req.body.email});
        }
        console.log("Updated successfully")
        // res.json({email: req.params.email, name: currentUser.name});
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
});


app.listen('3001', () => {
    console.log("listening to port 3001")
})
