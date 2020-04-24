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
        unique: true,
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

/** Find a user if the password provided matches with the stored one */
userSchema.statics.FindByCredentials = async (email, password) => {
    const user = await User.findOne({email}); 
    if(!user) throw new Error("unable to login email");

    const isMatchded = await bcrypt.compare(password, user.password);
    if(!isMatchded) throw new Error("unable to login pass");

    return user;
}

/** Secure user's password on creation/modification */
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