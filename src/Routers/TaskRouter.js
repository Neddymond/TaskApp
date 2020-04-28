const express = require("express");
/** Task model*/
const Task = require("../Models/Task");
const router = express.Router();
const auth = require("../Middleware/Auth");

/** Task creation endpoint using post request*/
router.post("/tasks", auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user.id
    });
    
    try{
        /** save task to the database */
        await task.save();
        res.status(201).send(task);
    }catch (e) {
        res.status(400).send(e);
    }
});

/** Endpont for fetching multiple tasks */
router.get("/tasks", auth, async (req, res) => {
    const match = {};

    /** Assign the completed value via the query string */
    if(req.query.completed) match.completed = req.query.completed === "true";

    try{
        /** Get all tasks */
        await req.user.populate({
            path: "tasks",
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate();
        res.send(req.user.tasks);
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Endpoint for fetching a task using a route parameter*/
router.get("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;

    try{
        /** Get a task by id */
        const task = await Task.findOne({_id, owner: req.user._id});
        !task ? res.status(404).send() : res.send(task);
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Enpoint for updating a task */
router.patch("/tasks/:id", auth, async (req, res) => {
    /** Get all the property names of the request body as an array */
    const reqBody = Object.keys(req.body);

    /** Array of updatable properties */
    const updatableProperties = ["description", "completed"];

    /** Check if each of the property name in "reqBody" is an updatable property */
    const isUpdatableProperty = reqBody.every((propertyName) => updatableProperties.includes(propertyName));

    /** If the above test fails, return a 400 error */
    if(!isUpdatableProperty) return res.status(400).send({Error: "Invalid update"});

    try{
        /** Find and update a task */
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id });
        if(!task) return res.status(404).send();

        reqBody.forEach((property) => task[property] = req.body[property]);

        await task.save();
        res.send(task);
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Endpoint for deleting a task */
router.delete("/tasks/:id", auth, async (req, res) => {
    try{
        const deletedeUser = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        !deletedeUser ? res.status(404).send() : res.send(deletedeUser);
    }catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;