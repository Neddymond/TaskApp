const express = require("express");
/** Task model*/
const Task = require("../Models/Task");
const router = express.Router();

/** Task creation endpoint using post request*/
router.post("/tasks", async (req, res) => {
    const task = new Task(req.body);

    try{
        /** save task to the database */
        await task.save();
        res.status(201).send(task);
    }catch (e) {
        res.status(400).send(e);
    }
});

/** Endpont for fetching multiple tasks */
router.get("/tasks", async (req, res) => {
    try{
        /** Get all tasks */
        const tasks = await Task.find({});
        res.send(tasks);
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Endpoint for fetching a task using a route parameter*/
router.get("/tasks/:id", async(req, res) => {
    const _id = req.params.id;

    try{
        /** Get a task by id */
        const task = await Task.findById(_id);
        task ? res.send(task) : res.status(400).send();
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Enpoint for updating a task */
router.patch("/tasks/:id", async(req, res) => {
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
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});

        !updatedTask ? res.status(404).send() : res.send(updatedTask);
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Endpoint for deleting a task */
router.delete("/tasks/:id", async(req, res) => {
    try{
        const deletedeUser = await Task.findByIdAndDelete(req.params.id);
        !deletedeUser ? res.status(404).send() : res.send(deletedeUser);
    }catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;