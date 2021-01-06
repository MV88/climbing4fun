const request = require('supertest');
const app = require('../app');

describe("App", () => {
  it("should respond with a message", async () => {
    const response = await request(app)
      .get("/")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);
    expect(response.body.message).toEqual("Climbing for fun");
  });
});
