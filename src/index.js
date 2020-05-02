/** express */
const app = require("./App");

/** Port */
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
