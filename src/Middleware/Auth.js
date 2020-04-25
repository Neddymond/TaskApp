const jwt = require("jsonwebtoken");
const User = require("../Models/User");

/** Express Auth middleware */
const Auth = async (req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = jwt.verify(token, "NodeJsNinja");
        console.log(decodedToken);
        const user = await User.findOne({ _id: decodedToken.id, "tokens.token": token });
        
        if(!user) throw new Error();
        req.user = user;
        next();
    }catch (e) {
        res.status(401).send({ error: "please authenticate."});
    }

    // next();
}

module.exports = Auth;