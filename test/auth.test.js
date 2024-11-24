
const express = require('express');
router = express.Router();
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { expect } = chai;
const app = require("../app");
const adminModel = require("../model/adminModel");

chai.use(chaiHttp);

describe("Auth Routes", () => {
  let mockAdminModel;

  beforeEach(() => {
    mockAdminModel = sinon.stub(adminModel, "safemind_login");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("POST /safemind_login", () => {
    it("should handle successful login", (done) => {
      const mockData = { id: 1, email: "user@example.com" };
      mockAdminModel.callsFake((email, password, callback) => {
        callback(null, mockData, 0);
      });

      chai
        .request(app)
        .post("/safemind_login")
        .send({ email: "user@example.com", password: "password" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success", true);
          done();
        });
    });

    it("should handle incorrect password", (done) => {
      mockAdminModel.callsFake((email, password, callback) => {
        callback(null, null, 2);
      });

      chai
        .request(app)
        .post("/safemind_login")
        .send({ email: "user@example.com", password: "wrongpassword" })
        .end((err, res) => {
          expect(res.body).to.have.property("result", "Fail");
          expect(res.body).to.have.property("Message", "Incorrect password!");
          done();
        });
    });
  });

  describe("POST /safemind_create_account", () => {
    it("should create a new account successfully", (done) => {
      // Simulate account creation
      const mockCreateAccount = sinon.stub(adminModel, "safemind_create_account").callsFake((data, callback) => {
        callback(null, { id: 1, email: "user@example.com" });
      });

      chai
        .request(app)
        .post("/safemind_create_account")
        .send({ email: "user@example.com", password: "password123" })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("success", true);
          done();
          mockCreateAccount.restore();
        });
    });
  });
});
