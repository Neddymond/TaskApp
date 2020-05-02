/** Libraries */
const express = require("express");
require("./db/mongoose");

/** Import Routers */
const userRouter = require("./Routers/UserRouter");
const taskRouter = require("./Routers/TaskRouter");

/** Create an express application */
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
