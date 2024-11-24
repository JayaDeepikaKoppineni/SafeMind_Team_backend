describe("Group Chat Routes", () => {
    describe("POST /createGroup", () => {
      it("should create a group successfully", (done) => {
        const mockCreateGroup = sinon.stub(adminModel, "createGroup").callsFake((data, callback) => {
          callback(null, { id: 1, name: "Test Group" });
        });
  
        chai
          .request(app)
          .post("/createGroup")
          .send({ name: "Test Group" })
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property("success", true);
            expect(res.body.data).to.have.property("name", "Test Group");
            done();
            mockCreateGroup.restore();
          });
      });
    });
  
    describe("POST /Group_get", () => {
      it("should fetch group details", (done) => {
        const mockGroupData = { id: 1, name: "Test Group" };
  
        const mockGroupGet = sinon.stub(adminModel, "Group_get").callsFake((id, callback) => {
          callback(null, mockGroupData);
        });
  
        chai
          .request(app)
          .post("/Group_get")
          .send({ id: 1 })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.data).to.deep.equal(mockGroupData);
            done();
            mockGroupGet.restore();
          });
      });
    });
  
    describe("DELETE /deleteGroup/:id", () => {
      it("should delete a group successfully", (done) => {
        const mockDeleteGroup = sinon.stub(adminModel, "deleteGroup").callsFake((id, callback) => {
          callback(null, { message: "Group deleted successfully" });
        });
  
        chai
          .request(app)
          .delete("/deleteGroup/1")
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message", "Group deleted successfully");
            done();
            mockDeleteGroup.restore();
          });
      });
    });
  });
  