const mongoose = require("mongoose");

/** Connect to to database */
mongoose.connect("mongodb://127.0.0.1:27017/TaskManager-Api", {
    useUnifiedTopology: true,
    useCreateIndex: true
});

// /** Create a User model */
// const User = mongoose.model("User", {
//     name: { type: String},
//     age: {type: Number}
// });

// /** Create an instance of the user model */
// const me = new User({
//     name: "chinedu",
//     age: 24
// });

// /** Save the document to the database */
// me.save().then(() => console.log(me)).catch((error) => {console.log("Error:", error)});

/** Create a Task model */
const Task = mongoose.model("Task", {
    description: {type: String},
    completed: {type: Boolean}
});

/** create an instance of the Task model */
const todaysTask = new Task({
    description: "Watch JavaScript tutorial",
    completed: false
});

/** Save the document to the database */
todaysTask.save().then(() => console.log(todaysTask)).catch((error) => {console.log(error);})