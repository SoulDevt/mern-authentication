const jwt = require('jsonwebtoken');


const createToken = async (email, id) => {
    const token = await jwt.sign({ email, id}, process.env['JWT_SECRET_KEY'])
    return token;
}

const validateToken = async (req, res, next) => {
    const accessToken = req.cookies['access_token'];
    console.log(accessToken);
    if(!accessToken) return res.status(400).json({error: "User not authenticated"});

    try {
        const validToken = jwt.verify(accessToken, process.env['JWT_SECRET_KEY'])
        if(validToken){
            req.authenticated = true;
            return next();

        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {createToken, validateToken}