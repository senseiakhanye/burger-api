const express = require('express');
const orderRouter = require('./api/order');
const priceRouter = require('./api/pricelist');
const app = express();
require("./db/db");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(orderRouter);
app.use(priceRouter);

module.exports = app;