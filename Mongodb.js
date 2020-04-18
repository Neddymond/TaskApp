/** require the MongoClient off of the mongodb library */
const MongoClient = require("mongodb").MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";

/** name of the database to create */
const databaseName = "Task-Manager";

/** Connect to the database */
MongoClient.connect(connectionURL, { useUnifiedTopology: true}, (error, client) => {
    if(error) return console.log("Couldn't connect to the database server");
    
    /** Create a database using the databaseName we created earlier */
    const db = client.db(databaseName);

    db.collection("Users").insertOne({
        name: "Chinedu",
        age: 23
    })
})
