const request = require('supertest');
const User = require('../src/models/user');
const app = require('../src/app');
const { setupDb, user_id_1, user_1 } = require('./Fixtures/db');

beforeEach(setupDb);

const userInfo = {
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

test("Should not return user without token", async (done) => {
    const response = await request(app)
        .get("/user")
        .send()
        .expect(403);
    expect(response.body).toEqual({});
    done();
});

test("Should return user from token", async(done) => {
    const response = await request(app)
        .get("/user")
        .set("Authorization", `Bearer ${user_1.tokens[0].token}`)
        .send()
        .expect(200);
    expect(response.body._id.toString()).toEqual(user_id_1.toString());
    done();
});

test("Should store user", async (done) => {
    const testUser = { ...userInfo };
    const response = await request(app)
        .post("/user/register")
        .send(testUser)
        .expect(201);
    expect(testUser.password).not.toEqual(response.body.password);
    done();
});

test("Should login in a valid user", async (done) => {
    const testUser = await User.findById(user_id_1);
    expect(testUser).not.toBeNull();    
    const response = await request(app)
        .post("/user/login")
        .send({username: testUser.username, password: "thisiseasy"})
        .expect(200);
    expect(response.body.token).not.toBeUndefined();
    done();
});

test("Should not login in a valid user with incorrect password", async (done) => {
    const testUser = await User.findById(user_id_1);
    await request(app)
        .post("/user/login")
        .send({username: testUser.username, password: "thisiseasY"})
        .expect(403);
    done();
});

test("User should logout with valid token", async (done) => {
    await request(app)
        .post("/user/logout")
        .set("Authorization", `Bearer ${user_1.tokens[0].token}`)
        .send()
        .expect(200);
    done();
});
