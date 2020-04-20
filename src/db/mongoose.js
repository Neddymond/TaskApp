const mongoose = require("mongoose");

/** Connect to to database */
mongoose.connect("mongodb://127.0.0.1:27017/TaskManager-Api", {
    useNewUrlParser: true,
    useCreateIndex: true
});

/** Create a User model */
const User = mongoose.model("User", {
    name: { type: String},
    age: {type: Number}
});

/** Create an instance of the user model */
const me = new User({
    name: "chinedu",
    age: 24
});

/** Save the document to the database */
me.save().then(() => console.log(me)).catch((error) => {console.log("Error:", error)});
