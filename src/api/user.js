const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

router.post("/user/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.createJsonWebToken();
        res.status(200).send( {user, token} );
    } catch( error ) {
        res.status(403).send();
    }
});

router.post("/user/register", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch( error ) {
        res.status(400).send({ error });
    }
});

router.post("/user/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token != req.token);
        await req.user.save();
        res.status(200).send();
    } catch(error) {
        res.status(500).send();
    }
});

router.get('/user', auth, async(req, res) => {
    if (req.user == null) {
        return res.status(500).send();
    }
    res.status(200).send(req.user);
})

module.exports = router;
