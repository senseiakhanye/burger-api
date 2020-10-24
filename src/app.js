const express = require('express');
const orderRouter = require('./api/order');
const priceRouter = require('./api/pricelist');
const userRouter = require('./api/user');
const app = express();
require("./db/db");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json());
app.use(orderRouter);
app.use(priceRouter);
app.use(userRouter);
app.get("/", (req, res) => {
    res.status(404).send();
})
app.get("*", (req, res) => {
res.status(404).send();
})
module.exports = app;