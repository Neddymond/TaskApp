/** Libraries */
const express = require("express");

const app = express();

app.use(express.json());

/** Port */
const port = process.env.PORT  || 3000;

app.post("/users", (req, res) => {
    console.log(req.body);
    res.send("Testing!");
});

app.listen(port, () => {
    console.log(`Server is up on port on ${port}`);
})