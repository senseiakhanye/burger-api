const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        if (req.header("Authorization") == null) {
            throw new Error("User not authorised");
        }
        const token = req.header("Authorization").replace("Bearer ", "");
        const verify = await jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById(verify._id);
        if (user == null) {
            throw new Error("User not authorised");
        }
        req.token = token;
        req.user = user;
        next();
    } catch(error) {
        // console.log(error);
        res.status(403).send();
    }
    
}

module.exports = auth;