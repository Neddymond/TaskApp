const mongoose = require("mongoose");

/** Connect to to database */
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
});
