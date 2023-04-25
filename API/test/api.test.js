const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { expect } = chai;

chai.use(chaiHttp);

describe("Users API", () => {
  let testUserId;

  describe("GET /users", () => {
    it("should return all users", (done) => {
      chai
        .request(app)
        .get("/users")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("POST /users", () => {
    it("should create a new user", (done) => {
      const newUser = {
        name: "Test User",
        email: "test.user@example.com",
        password: "testpassword",
        balance: 1000,
      };

      chai
        .request(app)
        .post("/users")
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal("User added");
          expect(res.body).to.have.property("id");
          testUserId = res.body.id;
          done();
        });
    });
  });

  describe("PUT /users/:id", () => {
    it("should update a user", (done) => {
      const updatedUser = {
        name: "Updated Test User",
        email: "updated.test.user@example.com",
        password: "updatedpassword",
        balance: 2000,
      };

      chai
        .request(app)
        .put(`/users/${testUserId}`)
        .send(updatedUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal("User updated");
          expect(res.body.affectedRows).to.equal(1);
          done();
        });
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user", (done) => {
      chai
        .request(app)
        .delete(`/users/${testUserId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal("User deleted");
          expect(res.body.affectedRows).to.equal(1);
          done();
        });
    });
  });
});