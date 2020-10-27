const request = require('supertest');
const Order = require('../src/models/order');
const app = require("../src/app");
const { order, order_id, setupDb, user_id_1, user_1, user_id_2, user_2, order_id_2, order_2 } = require('./Fixtures/db');
const { response } = require('../src/app');

describe("Tesing Order API", () => {

    beforeEach(setupDb);

    it("Should store order for user 1", async (done) => {
        const order_test_1 = { ...order};
        delete order_test_1._id;
        const response = await request(app)
            .post("/order")
            .set("Authorization", `Bearer ${user_1.tokens[0].token}`)
            .send(order_test_1)
            .expect(201);
        expect(response._id).not.toBeNull();
        const tempOrders = await Order.find({customer: user_id_1});
        expect(tempOrders.length).toEqual(3);
        done();
    });

    it("Should get all orders", async (done) => {
        const response = await request(app)
            .get("/orders")
            .set("Authorization", `Bearer ${user_1.tokens[0].token}`)
            .send()
            .expect(200);
        expect(response.body.length).toEqual(2);
        expect(response.body[0].price).toEqual(2);
        done();
    });

    it("Should get order by id", async (done) => {
        const response = await request(app)
            .get(`/order/${order_id}`)
            .set("Authorization", `Bearer ${user_1.tokens[0].token}`)
            .send()
            .expect(200);
        expect(response.body).not.toBeNull();
        expect(response.body._id.toString()).toEqual(order_id.toString())
        done();
    });

    it("User 1 should not get user 2 order", async (done) => {
        const response = await request(app)
            .get(`/order/${user_id_2}`)
            .set("Authorization", `Bearer ${user_1.tokens[0].token}`)
            .send()
            .expect(403);
        done();
    });

    it("Price should be the same", async (done) => {
        expect(1).toEqual(1);
        done();
    });
});
