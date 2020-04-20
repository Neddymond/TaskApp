const mongoose = require("mongoose");
const validator = require("validator");

/** Connect to to database */
mongoose.connect("mongodb://127.0.0.1:27017/TaskManager-Api", {
    useUnifiedTopology: true,
    useCreateIndex: true
});

/** Create a User model */
const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    age: {
        type: Number,
        default: 0, 
        validate(value){
            if(value < 0) throw new Error("Positive number required");
        }
    }
});

/** Create an instance of the user model */
const me = new User({
    name: "chinedu",
    email: "chineDu@gmail.coM"
});

/** Save the document to the database */
me.save().then(() => console.log(me)).catch((error) => {console.log("Error:", error)});

// /** Create a Task model */
// const Task = mongoose.model("Task", {
//     description: {type: String},
//     completed: {type: Boolean}
// });

// /** create an instance of the Task model */
// const todaysTask = new Task({
//     description: "Watch JavaScript tutorial",
//     completed: false
// });

// /** Save the document to the database */
// todaysTask.save().then(() => console.log(todaysTask)).catch((error) => {console.log(error);})