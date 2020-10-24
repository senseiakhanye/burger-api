const mongoose = require('mongoose');
const Order = require('../../src/models/order');
const User = require('../../src/models/user');

const order_id = new mongoose.Types.ObjectId();
const order = {
    _id: order_id, 
    ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 1, 
        meat: 1
    },
    price: 2,
    deliveryMethod: "fastest"
};

const order_id_2 = new mongoose.Types.ObjectId();
const order_2 = {
    _id: order_id_2, 
    ingredients: {
        salad: 2,
        bacon: 2,
        cheese: 2, 
        meat: 2
    },
    price: 4,
    deliveryMethod: "fastest"
};

const order_id_3 = new mongoose.Types.ObjectId();
const order_3 = {
    _id: order_id_3, 
    ingredients: {
        salad: 3,
        bacon: 3,
        cheese: 3, 
        meat: 3
    },
    price: 8,
    deliveryMethod: "fastest"
};

const user_id_1 = new mongoose.Types.ObjectId();
const user_1 = {
    _id: user_id_1,
    name: "Katleho",
    address: {
        street: "341 First Road",
        zipCode: "1685",
        country: "South Africa"
    },
    email: "kat@kat.co.za",
    username: "testusername",
    password: "thisiseasy"
};

const user_id_2 = new mongoose.Types.ObjectId();
const user_2 = {
    _id: user_id_2,
    name: "Katleho 2",
    address: {
        street: "341 First Road",
        zipCode: "1685",
        country: "South Africa"
    },
    email: "kat2@kat2.co.za",
    username: "testusername",
    password: "thisiseasy123"
};

const setupDb = async (done)  => {
    await User.deleteMany();
    await Order.deleteMany();
    user_1.tokens = [];
    user_2.tokens = [];
    const userTemp = new User(user_1);
    const userTemp_2 = new User(user_2);
    await userTemp.save();
    await userTemp_2.save();
    await userTemp.createJsonWebToken();
    await userTemp_2.createJsonWebToken();
    user_1.tokens = [...userTemp.tokens];
    user_2.tokens = [...userTemp_2.tokens];
    order.customer = user_1._id;
    order_2.customer = user_2._id;
    order_3.customer = user_1._id;
    const orderData = new Order(order);
    const orderData_2 = new Order(order_2);
    const orderData_3 = new Order(order_3);
    await orderData.save();
    await orderData_2.save();
    await orderData_3.save();
    // console.log(`User ID 1 : ${user_1._id} | ${user_id_1}`);
    // console.log(`User ID 2 : ${user_2._id} | ${user_id_2}`);
    // console.log(`Order ID 1 : ${orderData._id}`);
    // console.log(`Order ID 2 : ${orderData_2._id}`);
    // console.log(`Order ID 3 : ${orderData_3._id}`);
    done();
}

module.exports = {
    order_id,
    order_id_2,
    order_id_3,
    order,
    order_2,
    order_3,
    user_id_1,
    user_1,
    user_2,
    user_id_2,
    setupDb
}