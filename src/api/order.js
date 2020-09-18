const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get("/orders", (req, res) => {
    Order.find({}).then((orders) => {
        res.send(orders);
    }).catch(error => {
        console.log(error);
        res.status(400).send();
    })
});

router.get("/order/:id", (req, res) => {
    Order.findById(req.params.id).then( order => {
        res.send(order);
    }).catch( error => {
        console.log(error);
        res.status(400).send();
    })
});

router.post("/order", (req, res) => {
    const order = new Order(req.body);
    order.save().then(() => {
        res.status(201).send(order);
    }).catch(error => {
        console.log(error);
        res.status(400).send();
    })
})

module.exports = router;