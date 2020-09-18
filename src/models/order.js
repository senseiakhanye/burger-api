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
        name: {
            type: String,
            required: true,
            minlength: 4
        },
        address: {
            street: {
                type: String,
                required: true
            },
            zipCode: {
                type: String
            },
            country: {
                type: String
            }
        },
        email: {
            type: String,
            required: true
        }
    },
    deliveryMethod: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
