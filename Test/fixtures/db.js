const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/Models/User");

const user1Id = new mongoose.Types.ObjectId();

const user1 = {
    _id: user1Id,
    name: "Neddy",
    email: "Neddy@facebook.com",
    password: "Neddy123??",
    tokens: [{
        token: jwt.sign({ id: user1Id }, process.env.JWT_SECRET_KEY)
    }]
};

const SetUpDatabase = async () => {
    await User.deleteMany();
    await new User(user1).save();
};

module.exports = { user1Id, user1, SetUpDatabase };