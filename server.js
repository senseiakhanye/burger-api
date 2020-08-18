// import express from 'express';
const express = require('express');
// const database = require('../database/database.js');

const app = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.json());

const port = process.env.PORT || 4007;

app.get('/api/burger', (req, res) => {
    // res.json({data: database.readOrders()});
    res.json([{status: "ok"}]);
});

app.post('/api/burger', (req, res) => {
    if (req.body.order == null) {
        return res.status(400).json({error: 'request invalid'});
    }
    // res.status(201).json(database.addOrder(req.body.order));
    res.json({saved : "true"});
});

app.get('/', (req, res) => {
    res.status(404).send('You are not authorised');
});

app.get('*', (req, res) => {
    res.status(404).send('You are not authorised');
});

app.listen( port, () => {
    console.log(`Listening on port ${port}`);
});

