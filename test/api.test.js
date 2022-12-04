const request = require("supertest");
const app = require("../src/app");

describe("POST /api/v1/register", () => {
  it("responds with user", (done) => {
    request(app)
      .post("/api/v1/register")
      .set("Accept", "application/json")
      .send({
        name: "Test Akromi",
        email: "test7@gmail.com",
        password: "12345678",
        address: "Bandung Jawa Barat",
        phoneNumber: "08312578871",
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /api/v1/login", () => {
  it("responds with user", (done) => {
    request(app)
      .post("/api/v1/login")
      .set("Accept", "application/json")
      .send({
        email: "test@gmail.com",
        password: "1234",
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
