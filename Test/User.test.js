const request = require("supertest");
const app = require("../src/App");

test("User should be able to sign up", async () => {
    await request(app).post("/users").send({
        name: "Chinedu",
        email: "Chinedu@Stripe.com",
        password: "stripedchinedu!!!"
    }).expect(201);
});