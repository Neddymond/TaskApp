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

/** User creation endpoint using post request*/
app.post("/users", (req, res) => {
    const user = new User(req.body);

    /** Save user to the database */
    user.save().then(() => res.status(201).send(user)).catch((e) => {
        res.status(400).send(e);
    });
});

/** Endpoint for fetching multiple users*/
app.get("/users", (req, res) => {
    User.find({}).then((users) => res.send(users)).catch((e) => {res.status(500).send();});
});

/** Endpoint for fetching a user using a route parameter */
app.get("/users/:id", (req, res) => {
    /** The Id to query for */
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        /** Return 404 error if user is not found */
        user ? res.send(user) : res.status(404).send();
    }).catch((e) => res.status(500).send());
});

/** Task creation endpoint using post request*/
app.post("/tasks", (req, res) => {
    const task = new Task(req.body);

    /** save task to the database */
    task.save().then(() => res.status(201).send(task)).catch((e) => { res.status(400).send(e);});
});

/** Endpont for fetching multiple tasks */
app.get("/tasks", (req, res) => {
    Task.find({}).then((tasks) => res.send(tasks)).catch((e) => res.status(500).send());
});

/** Endpoint for fetching a task using a route parameter*/
app.get("/tasks/:id", (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        /** Returns task if found, else, return 404 error */
        task ? res.send(task) : res.status(404).send();
    }).catch((e) => res.status(500).send());
});

app.listen(port, () => {
    console.log(`Server is up on port on ${port}`);
});