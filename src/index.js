/** Libraries */
const express = require("express");
require("./db/mongoose");

/** Modules */
const User = require("./Models/User");

const app = express();

app.use(express.json());

/** Port */
const port = process.env.PORT  || 3000;

app.post("/users", (req, res) => {
    const user = new User(req.body);

    /** Save to the database */
    user.save().then(() => res.send(user)).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Server is up on port on ${port}`);
})