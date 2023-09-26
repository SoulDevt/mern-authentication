const User = require('../models/user-schema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
        // const saltRounds = 10;
        // const salt = bcrypt.genSaltSync(saltRounds);
        //const hashPassword = bcrypt.hashSync(req.body.password, salt);
        // console.log(checkUser.password)
        try {
            const findUser = await User.findOne({ email: req.body.email });
            if (findUser) {
                const checkPassword = bcrypt.compareSync(req.body.password, findUser.password);
                if (checkPassword) {
                    const token = await jwt.sign({ email: req.body.email }, "secret123")
                    res.json({ status: 'ok', token: token })
                } else {
                    res.json({ error: 'bad credentials' });
                }
            } else {
                res.status(401).json({ error: 'User doesnt exist' });
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
}

const register = async (req, res) => {
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
    console.log("launched")
    try {
        // const currentUser = await User.findOne({ email: req.params.email });
        // console.log(req.headers.authorization)
        const splitToken = req.headers.authorization.split(' ')
        const token = splitToken[1]
        const decoded = jwt.verify(token, 'secret123')
        console.log(decoded)
        //const email = decoded.email;
        // console.log(email)
        if (decoded.email) {
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

    // const { email } = req.params.email;
    // console.log("email: " + email)
    // try {
    //     res.json(quote);
    // } catch (error) {
    //     return res.json({ error: error });
    // }

    //res.json('access to home root');
}

module.exports = {
    login,
    register,
    showProfile,
    editProfile
}