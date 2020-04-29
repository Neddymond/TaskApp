/** Libraries */
const express = require("express");
require("./db/mongoose");

/** Import Routers */
const userRouter = require("./Routers/UserRouter");
const taskRouter = require("./Routers/TaskRouter");

/** Create an express application */
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// const multer = require("multer");
// const upload = multer({
//     dest: "images",
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error("Please upload a Word docs."));
//         }
//         cb(undefined, true);
//     }
// });

// app.post("/upload", upload.single("upload"), (req, res) => {
//     res.send();
// });

/** Port */
const port = process.env.PORT  || 3000;

app.listen(port, () => {
    console.log(`Server is up on port on ${port}`);
});
