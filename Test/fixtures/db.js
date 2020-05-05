const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/Models/User");
const Task = require("../../src/Models/Task");

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

const user2Id = new mongoose.Types.ObjectId();

const user2 = {
    _id: user2Id,
    name: "Sunny",
    email: "sunny@stripe.com",
    password: "striper123!!",
    tokens: [{
        token: jwt.sign({ id: user2Id }, process.env.JWT_SECRET_KEY)
    }]
};

const Task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: "TaskeOne",
    completed: true,
    owner: user1._id
};

const Task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: "TaskTwo",
    completed: true,
    owner: user1._id
};

const Task3 = {
    _id: new mongoose.Types.ObjectId(),
    description: "TaskeThree",
    completed: true,
    owner: user2._id
};

const SetUpDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(user1).save();
    await new User(user2).save();
    await new Task(Task1).save();
    await new Task(Task2).save();
    await new Task(Task3).save();
};

module.exports = { user1Id, user1, user2Id, user2, Task1, SetUpDatabase };