const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    ingredients: {
        salad: {
            type: Number,
            required: true
        },
        bacon: {
            type: Number,
            required: true
        },
        cheese: {
            type: Number,
            required: true
        },
        meat: {
            type: Number,
            required: true
        }
    },
    price: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    deliveryMethod: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
