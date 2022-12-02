const request = require("supertest");

const app = require("../src/app");

describe("GET /", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
        },
        done
      );
  });
});

describe("GET /api/v1/tweet", () => {
  it("responds with tweet", (done) => {
    request(app)
      .get("/api/v1/tweet")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /api/v1/register", () => {
  it("responds with user", (done) => {
    request(app)
      .post("/api/v1/register")
      .send({
        fullName: "Test Akromi",
        username: "test",
        phoneNumber: "0931235234",
        email: "test@gmail.com",
        password: "test123",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
