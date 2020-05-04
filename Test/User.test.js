const app = require("../src/App");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const request = require("supertest");
const User = require("../src/Models/User");

const user1Id = new mongoose.Types.ObjectId();

const GenerateToken = () => jwt.sign({ _id: user1Id }, process.env.JWT_SECRET_KEY);

const user1 = {
    _id: user1Id,
    name: "Neddy",
    email: "Neddy@facebook.com",
    password: "Neddy123??",
    tokens: [{
        token: GenerateToken()
    }]
};

/** operations to run before each test */
beforeEach( async () => {
    await User.deleteMany();
    await new User(user1).save();
});

/** Test the sign up route */
test("User should be able to sign up", async () => {
    const response = await request(app).post("/users").send({
        name: "Chinedu",
        email: "Chinedu@Stripe.com",
        password: "stripedchinedu!!!"
    }).expect(201);

    /** Assert that the database was changed correctly */
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    /** Assertions about the response */
    expect(response.body).toMatchObject({
        user: { 
            name: "Chinedu",
            email: "chinedu@stripe.com"
        },
        token: user.tokens[0].token
    });

    /** Assertions about the password */
    expect(user.password).not.toBe("stripedchinedu!!!");
});

/** Test for successful login */
test("User should be able to login when they provide correct credentials", async () => {
    const res = await request(app).post("/users/login").send({
        email: user1.email,
        password: user1.password
    }).expect(200);

    /** Fetch user */
    const user = await User.findById(user1._id);

    /** Assertion that token in response matches the second token */
    expect(res.body.token).toBe(user.tokens[1].token);
});

/** Test for unsuccessful loogin */
test("Shoud not login non-existent user", async () => {
    await request(app).post("/users/login").send({
        email: "chinedu@Unmotivated.com",
        password: "Fear&Driveless!"
    }).expect(400);
});

/** Test for fetching an authenticated user */
test("Should read an authenitcated user's profile", async () => {
    console.log(user1.tokens[0].token);
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);
});

/** Test for unauthorized user */
test("Should expect 401 for unauthorized user", async () => {
    await request(app)
    .get("/users/me")
    .send()
    .expect(401)
});

/** Test for deleting an authenticated user */
test("Should delete a user", async () => {
    await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200);
    
    const user = User.findById(user1._id);
    expect(user).toBeNull();
}); 

/** Test for deleting an unauthorized user */
test("Should not delete an unauthenticated user", async () => {
    await request(app)
    .delete("/users/me")
    .send()
    .expect(401);
});



