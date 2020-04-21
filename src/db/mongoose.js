const mongoose = require("mongoose");

/** Connect to to database */
mongoose.connect("mongodb://127.0.0.1:27017/TaskManager-Api", {
    useNewUrlParser: true,
    useCreateIndex: true
});
