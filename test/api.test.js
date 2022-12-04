const request = require("supertest");
const app = require("../src/app");

describe("GET /api/v1/tweet", () => {
  it("responds with tweet", (done) => {
    request(app)
      .get("/api/v1/tweet")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /api/v1/tweet", () => {
  it("responds with a new tweet", (done) => {
    request(app)
      .post("/api/v1/tweet")
      .set("Accept", "application/json")
      .send({
        userId: "6495ccda-46db-4754-8513-2a55794946cc",
        like: 123,
        content: "Test Hello",
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("PUT /api/v1/tweet/:id", () => {
  it("responds with updated tweet", (done) => {
    request(app)
      .put("/api/v1/tweet/20076d51-7119-4871-811d-850798e878ac")
      .set("Accept", "application/json")
      .send({
        like: 25,
        content: "Hello PUT Tweet",
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("PATCH /api/v1/tweet/:id", () => {
  it("responds with tweet", (done) => {
    request(app)
      .patch("/api/v1/tweet/20076d51-7119-4871-811d-850798e878ac")
      .set("Accept", "application/json")
      .send({
        content: "Hello Tweet From PATCH",
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("DELETE /api/v1/tweet/:id", () => {
  it("responds with tweet", (done) => {
    request(app)
      .delete("/api/v1/tweet/45c1a3b9-9553-411b-b8cc-97ca060577e6")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /api/v1/register", () => {
  it("responds with user", (done) => {
    request(app)
      .post("/api/v1/register")
      .set("Accept", "application/json")
      .send({
        fullName: "Test Akromi",
        username: "test",
        phoneNumber: "0931235234",
        email: "asd@gmail.com",
        password: "test123",
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
