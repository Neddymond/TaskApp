const express = require("express");
const router = new express.Router();
/** User Model */
const User = require("../Models/User");

/**Endpoint for creating a user using a route pointer*/
router.post("/users", async (req, res) => {
    const user = new User(req.body);
    /** Save user to the database */
    try{
        await user.save();
        res.status(201).send(user);
    }catch (e) {
        res.status(400).send(e);
    }
});

/** Endpoint for fetching multiple users*/
router.get("/users", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Endpoint for fetching a user using a route parameter */
router.get("/users/:id", async (req, res) => {
    /** The Id to query for */
    const _id = req.params.id;

    try{
        const user = await User.findById(_id);

        /** Return 404 error if user is not found */
        user ? res.send(user) : res.status(404).send();
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Endpoint for updating a user */
router.patch("/users/:id", async (req, res) => {
    /** Get the property names of the request body as an array */
    const reqBody = Object.keys(req.body);

    /** List of things allowed to be updated */
    const allowedUpdates = ["name", "email", "age", "password"];

    /** Check if each of the "reqBody" is among the things allowed to be updated*/
    const isAllowedUpdates = reqBody.every((body) => allowedUpdates.includes(body));

    /** If the above test failed, return a 404 error */
    if(!isAllowedUpdates){
        return res.status(400).send({Error: "Invalid update"});
    }
    
    try{
        /** Fetch and update a document */
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!user){
        return res.status(400).send();
    }
    res.send(user);
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Endpoint for delering a user */
router.delete("/users/:id", async(req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        !deletedUser ? res.status(404).send() : res.send(deletedUser);
    }catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;