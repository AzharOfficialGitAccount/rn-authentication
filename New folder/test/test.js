let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

chai.should();

chai.use(chaiHttp);

describe("Tasks API", () => {
    /**
     * Test the GET user route for Register
     */
    describe("GET /api/tasks", () => {
        it("It should  GET all the tasks", (done) => {
            chai
                .request(server)
                .get("/api/v1/getAllData")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });
});