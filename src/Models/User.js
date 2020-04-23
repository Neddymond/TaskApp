/** Libraries */
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

/** User Schema */
const userSchema = new mongoose.Schema({
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

userSchema.pre("save", async function(next){
    const user = this;

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

/** Create a User model */
const User = mongoose.model("User", userSchema);

/** Export User module */
module.exports = User;