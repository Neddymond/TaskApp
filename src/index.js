/** Libraries */
const express = require("express");
require("./db/mongoose");

/** Import Routers */
const userRouter = require("./Routers/UserRouter");
const taskRouter = require("./Routers/TaskRouter");

/** Create an express application */
const app = express();

// app.use((req, res, next) => {
//     req.method === "GET" ? res.send("Get requests are disabled") : next();
// });

// app.use((req, res, next) => {
//     req ? res.status(503).send("Our service is currently undergoing a maintenance, please, try again later") : next();
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

/** Port */
const port = process.env.PORT  || 3000;

app.listen(port, () => {
    console.log(`Server is up on port on ${port}`);
});