/** Destructured objects retutned by mongodb */
const {MongoClient, ObjectID  } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";

/** name of the database to create */
const databaseName = "Task-Manager";

/** Connect to the database */
MongoClient.connect(connectionURL, { useUnifiedTopology: true}, (error, client) => {
    if(error) return console.log("Couldn't connect to the database server");
    
    /** Create a database using the databaseName we created earlier */
    const db = client.db(databaseName);

    // /** Create a "Users collection and insert one document into it" */
    // db.collection("Users").insertOne({
    //     name: "Chinedu",
    //     age: 23
    // }, (error, result) => {
    //     if(error) return console.log("Couldn't insert the document into the collection. Kindly begin your deubgging process.");
    //     console.log(result.ops);
    // })

    // /** Insert multiple documents into the Users collection */
    // db.collection("Users").insertMany([
    //     {
    //         name: "Alonso",
    //         occupation: "Animator"
    //     },
    //     {
    //         name: "Emeka",
    //         occupation: "Software Engineer"
    //     }
    // ], (error, result) => {
    //     if(error) return console.log("couldn't insert document into the users collection. You can start your debugging process");
    //     console.log(result.ops);
    // })

    // /** Create a new collection and insert multiple documents */
    // db.collection("Todo").insertMany([
    //     {
    //         description: "Get a dope-ass six figure job",
    //         completed: false
    //     },
    //     {
    //         description: "Finish reading YDKJS",
    //         completed: false
    //     },
    //     {
    //         description: "Finish reading Unfuck yourself",
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error) return console.log("Couldn't insert the documents into the collection");
    //     console.log(result.ops);
    // })
    
    /** Query Users collection for a document */
    db.collection("Todo").findOne({_id: new ObjectID("5e9ae5d5735a10095466b3d5")}, (error, res) => {
        if(error) return console.log("Couldn't find the user.")
        console.log(res);
    })

    /** Query Users collection for multiple documents */
    db.collection("Todo").find({completed: true}).toArray((error, res) => {
        if(error) return console.log("Query failed.");
        console.log(res);
    })
})
