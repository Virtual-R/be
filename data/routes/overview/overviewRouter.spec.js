const request = require("supertest");
const server = require("../../../api/server");
const db = require("../../config/dbConfig");

beforeEach(async () => {
  await db.seed.run();
});

describe("projects router tests", () => {
  test("get all projects", async () => {
    jest.setTimeout(10000);
    const res = await request(server).get("/api/overview");
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });
});
