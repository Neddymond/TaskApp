const Task = require("../src/Models/Task");
const request = require("supertest");
const app = require("../src/App");
const { user1Id, user1, SetUpDatabase } = require("./fixtures/db");

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
})