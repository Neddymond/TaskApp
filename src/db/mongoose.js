const mongoose = require("mongoose");

/** Connect to to database */
mongoose.connect("mongodb://127.0.0.1:27017/TaskManager-Api", {
    useNewUrlParser: true,
    useCreateIndex: true
});

/** Create an instance of the user model */
// const me = new User({
//     name: "chinedu",
//     email: "chineDu@gmail.coM",
//     password: "Neddymond10"
// });

/** Save the document to the database */
// me.save().then(() => console.log(me)).catch((error) => {console.log("Error:", error)});

/** create an instance of the Task model */
// const todaysTask = new Task({
//     description: "Write a medium article",
// });

/** Save the document to the database */
// todaysTask.save().then(() => console.log(todaysTask)).catch((error) => {console.log(error);})