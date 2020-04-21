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

/** Create a user endpoint */
app.post("/users", (req, res) => {
    const user = new User(req.body);

    /** Save to the database */
    user.save().then(() => res.send(user)).catch((e) => {
        res.status(400).send(e);
    });
});

/** Create a task endpoint */
app.post("/tasks", (req, res) => {
    const task = new Task(req.body);

    /** save to the database */
    task.save().then(() => res.send(task)).catch((e) => { res.status(400).send(e);});
});

app.listen(port, () => {
    console.log(`Server is up on port on ${port}`);
});