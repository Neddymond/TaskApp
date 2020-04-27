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

/** Port */
const port = process.env.PORT  || 3000;

app.listen(port, () => {
    console.log(`Server is up on port on ${port}`);
});


const task = require("./Models/Task");
const user = require("./Models/User");

(async () => {
    const taskData = await user.findById("5ea35ab03087bc11e0681bc1");
    await taskData.populate("tasks").execPopulate();
    console.log(taskData.tasks);
})();