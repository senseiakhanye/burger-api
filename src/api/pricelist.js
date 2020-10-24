const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get("/api/pricelist",auth, (req, res) => {
    res.send({
        salad: 0.5,
        bacon: 2,
        cheese: 1,
        meat: 3
    })
})

module.exports = router;
