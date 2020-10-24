const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const auth = require('../middleware/auth');

router.get("/orders", auth, (req, res) => {
    Order.find({ customer: req.user._id }).then((orders) => {
        res.send(orders);
    }).catch(error => {
        console.log(error);
        res.status(400).send();
    })
});

router.get("/order/:id", auth, (req, res) => {
    Order.findById(req.params.id).then( order => {
        if (order == null || order.customer.toString() !== req.user._id.toString()) {
            throw new Error("User not authorised");
        }
        res.send(order);
    }).catch( error => {
        res.status(403).send();
    })
});

router.post("/order", auth, (req, res) => {
    const order = new Order(req.body);
    order.customer = req.user._id;
    order.save().then(() => {
        res.status(201).send(order);
    }).catch(error => {
        console.log(error);
        res.status(500).send();
    })
})

module.exports = router;