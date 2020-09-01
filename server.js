const app = require('./src/app');


const port = process.env.PORT;

// app.get('/api/burger', (req, res) => {
//     res.json({data: orders.getAll()});
//     // res.json([{status: "ok"}]);
// });

// app.get('/api/pricelist', (req, res) => {
//     res.json(prices.getPriceList());
// });

// app.post('/api/burger', (req, res) => {
//     if (req.body.order == null) {
//         return res.status(400).json({error: 'request invalid'});
//     }
//     // res.status(201).json(orders.addOrder(req.body.order));
//     res.json({saved : "true"});
// });

// app.get('/', (req, res) => {
//     res.status(404).send('You are not authorised');
// });

// app.get('*', (req, res) => {
//     res.status(404).send('You are not authorised');
// });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

