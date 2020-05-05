const Task = require("../src/Models/Task");
const request = require("supertest");
const app = require("../src/App");
const { user1Id, user1, user2, Task1, Task3, SetUpDatabase } = require("./fixtures/db");

beforeEach(SetUpDatabase);

test("Should create a task for an authenticated user", async () => {
    const res = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .send({
            description: "Show up everyday and grind, and i'll see you at the top!",
            completed: true
        })
        .expect(201);

        const user = await Task.findById(res.body._id);
        expect(user).not.toBeNull();
        expect(user.completed).toEqual(true);
});

test("Should get all task created by a user", async () => {
    const res = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);

    expect(res.body.length).toEqual(2);
});

test("Should not delete task created by another user", async () => {
    await request(app)
        .delete(`/tasks/${Task1._id}`)
        .set("Authorization", `Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(404)

    const task = Task.findById(Task1._id);
    expect(task).not.toBeNull();
});

test("Should fetch user task by id", async () => {
    await request(app)
        .get(`/tasks/${Task3._id}`)
        .set("Authorization", `Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(200)
});

test("Should fetch a user's incomplete tasks", async () => {
    const res = await request(app)
        .get("/tasks")
        .query({completed: "false"})
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);

    expect(res.body[0].completed).toEqual(false);
})