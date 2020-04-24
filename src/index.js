/** Libraries */
const express = require("express");
require("./db/mongoose");

/** Import Routers */
const userRouter = require("./Routers/UserRouter");
const taskRouter = require("./Routers/TaskRouter");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

/** Port */
const port = process.env.PORT  || 3000;

app.listen(port, () => {
    console.log(`Server is up on port on ${port}`);
});