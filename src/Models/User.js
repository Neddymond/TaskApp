/** Libraries */
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
})

/** Filter out sensitive data */
userSchema.methods.toJSON = function(){
    const user = this;
    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.tokens;

    return userObj;
}

/** Generate and save user token */
userSchema.methods.GenerateAuthToken = async function(){
    const user = this;
    const token = await jwt.sign({id: user._id.toString()}, "NodeJsNinja");
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

/** Find a user if the password provided matches with the stored one */
userSchema.statics.FindByCredentials = async (email, password) => {
    const user = await User.findOne({email}); 
    if(!user) throw new Error("unable to login");

    const isMatchded = await bcrypt.compare(password, user.password);
    if(!isMatchded) throw new Error("unable to login");

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