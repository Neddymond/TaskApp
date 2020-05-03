const request = require("supertest");
const app = require("../src/App");
const User = require("../src/Models/User");

const user1 = {
    name: "Neddy",
    email: "Neddy@facebook.com",
    password: "Neddy123??"
};

/** operations to run before each test */
beforeEach( async () => {
    await User.deleteMany();
    await new User(user1).save();
});

/** Test the sign up route */
test("User should be able to sign up", async () => {
    await request(app).post("/users").send({
        name: "Chinedu",
        email: "Chinedu@Stripe.com",
        password: "stripedchinedu!!!"
    }).expect(201);
});

/** Test for successful login */
test("User should be able to login when they provide correct credentials", async () => {
    await request(app).post("/users/login").send({
        email: user1.email,
        password: user1.password
    }).expect(200);
});

/** Test for unsuccessful loogin */
test("Shoud not login non-existent user", async () => {
    await request(app).post("/users/login").send({
        email: "chinedu@Unmotivated.com",
        password: "Fear&Driveless!"
    }).expect(400);
});