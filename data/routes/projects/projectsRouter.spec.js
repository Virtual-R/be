const request = require("supertest");
const server = require("../../../api/server");

const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets");

beforeAll(() => {
  const generateToken = (user) => {
    const payload = {
      subject: user.id,
      username: user.username,
    };
    const options = {
      expiresIn: "1d",
    };
    return jwt.sign(payload, secrets.jwt, options);
  };
  token = generateToken({ id: 1, username: "testuser1" });
});

describe("projects router tests", () => {
  test("get all projects for a user", async () => {
    const res = await request(server)
      .get("/api/users/1/projects")
      .set({ Authorization: token });
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  test("get a specific project", async () => {
    const res = await request(server)
      .get("/api/users/1/projects/1")
      .set({ Authorization: token });
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  test("create a new project", async () => {
    const payload = {
      user_id: 1,
      title: "Dogs, dogs, dogs!",
      description: "So many dogs! We love dogs. You can pet them.",
      goal_amount: 10000,
      amount_received: 1000,
      funding_completed: false,
    };
    const res = await request(server)
      .post("/api/users/1/projects/")
      .set({ Authorization: token })
      .send(payload);
    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
  });

  test("update a project", async () => {
    const payload = {
      user_id: 1,
      title: "Dogs, dogs, dogs!",
      description: "So many dogs! We love dogs. You can pet them.",
      goal_amount: 10000,
      amount_received: 10000,
      funding_completed: true,
    };

    const res = await request(server)
      .put("/api/users/1/projects/3")
      .set({ Authorization: token })
      .send(payload);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  test("delete a project", async () => {
    const res = await request(server)
      .delete("/users/2/projects/2")
      .set({ Authorization: token });
    expect(res.status).toBe(204);
  });
});
