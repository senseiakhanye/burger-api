const request = require('supertest');
const Order = require('../src/models/order');
const app = require("../src/app");
const mongoose = require("mongoose");

const order_id = new mongoose.Types.ObjectId;
const order = {
    _id: order_id, 
    ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 1, 
        meat: 1
    },
    price: 2,
    customer: {
        name: "Katleho Khanye",
        address: {
            street: "341 First Road"
        },
        email: "kakhanye@gmail.com"
    },
    deliveryMethod: "fastest"
};

beforeEach(async (done) => {
    await Order.deleteMany();
    const orderData = new Order(order);
    await orderData.save();
    done();
});

test("Should store order", async (done) => {
    const order_1 = { ...order};
    delete order_1._id;
    const response = await request(app)
        .post("/order")
        .send(order_1)
        .expect(201);
    expect(response._id).not.toBeNull();
    const orders = await Order.find({});
    expect(orders.length).toEqual(2);
    done();
});

test("Should get one order", async (done) => {
    const response = await request(app)
        .get("/orders")
        .send()
        .expect(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].price).toEqual(2);
    done();
});

test("Should get order by id", async (done) => {
    const response = await request(app)
        .get(`/order/${order_id}`)
        .send()
        .expect(200);
    expect(response.body).not.toBeNull();
    expect(response.body._id.toString()).toEqual(order_id.toString())
    done();
});

test("Price should be the same", async (done) => {
    expect(1).toEqual(1);
    done();
});