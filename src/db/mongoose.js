const mongoose = require("mongoose");
const validator = require("validator");

/** Connect to to database */
mongoose.connect("mongodb://127.0.0.1:27017/TaskManager-Api", {
    useNewUrlParser: true,
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
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Invalid password. Password cannot 'password'.")
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
// const me = new User({
//     name: "chinedu",
//     email: "chineDu@gmail.coM",
//     password: "Neddymond10"
// });

/** Save the document to the database */
// me.save().then(() => console.log(me)).catch((error) => {console.log("Error:", error)});

/** Create a Task model */
const Task = mongoose.model("Task", {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

/** create an instance of the Task model */
const todaysTask = new Task({
    description: "Write a medium article",
});

/** Save the document to the database */
todaysTask.save().then(() => console.log(todaysTask)).catch((error) => {console.log(error);})