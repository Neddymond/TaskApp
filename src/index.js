/** Libraries */
const express = require("express");
require("./db/mongoose");

/** Import Models */
const User = require("./Models/User");
const Task = require("./Models/Task");

const app = express();

app.use(express.json());

/** Port */
const port = process.env.PORT  || 3000;

/**Endpoint for creating a user using a route pointer*/
app.post("/users", async (req, res) => {
    const user = new User(req.body);
    /** Save user to the database */
    try{
        await user.save();
        res.status(201).send(user);
    }catch (e) {
        res.status(400).send(e);
    }
});

/** Endpoint for fetching multiple users*/
app.get("/users", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Endpoint for fetching a user using a route parameter */
app.get("/users/:id", async (req, res) => {
    /** The Id to query for */
    const _id = req.params.id;

    try{
        const user = await User.findById(_id);

        /** Return 404 error if user is not found */
        user ? res.send(user) : res.status(404).send();
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Endpoint for updating a user */
app.patch("/users/:id", async (req, res) => {
    /** Get the property names of the request body as an array */
    const reqBody = Object.keys(req.body);

    /** List of things allowed to be updated */
    const allowedUpdates = ["name", "email", "age", "password"];

    /** Check if each of the "reqBody" is among the things allowed to be updated*/
    const isAllowedUpdates = reqBody.every((body) => allowedUpdates.includes(body));

    /** If the above test failed, return a 404 error */
    if(!isAllowedUpdates){
        return res.status(400).send({Error: "Invalid update"});
    }
    
    try{
        /** Fetch and update a document */
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!user){
        return res.status(400).send();
    }
    res.send(user);
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Task creation endpoint using post request*/
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);

    try{
        /** save task to the database */
        await task.save();
        res.status(201).send(task);
    }catch (e) {
        res.status(400).send(e);
    }
});

/** Endpont for fetching multiple tasks */
app.get("/tasks", async (req, res) => {
    try{
        /** Get all tasks */
        const tasks = await Task.find({});
        res.send(tasks);
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Endpoint for fetching a task using a route parameter*/
app.get("/tasks/:id", async(req, res) => {
    const _id = req.params.id;

    try{
        /** Get a task by id */
        const task = await Task.findById(_id);
        task ? res.send(task) : res.status(400).send();
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Enpoint for updating a task */
app.patch("/tasks/:id", async(req, res) => {
    /** Get all the property names of the request body as an array */
    const reqBody = Object.keys(req.body);

    /** Array of updatable properties */
    const updatableProperties = ["description", "completed"];

    /** Check if each of the property name in "reqBody" is an updatable property */
    const isUpdatableProperty = reqBody.every((propertyName) => updatableProperties.includes(propertyName));

    /** If the above test fails, return a 400 error */
    if(!isUpdatableProperty) return res.status(400).send({Error: "Invalid update"});

    try{
        /** Find and update a task */
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});

        !updatedTask ? res.status(404).send() : res.send(updatedTask);
    }catch (e) {
        res.status(500).send(e);
    }
})

app.listen(port, () => {
    console.log(`Server is up on port on ${port}`);
});