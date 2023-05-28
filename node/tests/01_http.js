const chai = require("chai");
const chaiHttp = require("chai-http");
const { faker } = require("@faker-js/faker")
chai.should();
chai.use(chaiHttp);
const app = require("app");
const {  RequestLog } = require("app/models/index");

describe("Drone Service Http Request Test", () => {

    before(done => {
        RequestLog.sync({ force: true }).then(() => done())
    })

    it("Should log incoming request and response", done => {
        chai.request(app)
            .get("/ping")
            .end((err, response) => {
                if(err) done(err)
                RequestLog.findAll({ raw: true }).then(logs => {
                    response.should.have.property("body")
                    response.body.should.be.an("object")
                    logs.should.be.an("array");
                    logs.length.should.be.eql(1);
                    logs[0].should.have.property("endpoint").eql("/ping")
                    logs[0].should.have.property("response").deep.equal(JSON.stringify(response.body))
                    done()
                }).catch(e => {
                    done(e)
                })
            })
    })

    it("Should give 200 response with message 'Service is up'", done => {
        chai.request(app)
            .get("/ping")
            .end((err, response) => {
                if(err) done(err)
                response.should.have.status(200)
                response.should.have.property("body")
                response.body.should.be.an("object")
                response.body.should.have.property("data").deep.equal({
                    message: "Service is up!"
                })
                done();
            })
    })

    it("Should give 404 response with message 'Not Found' for invalid service url", done => {
        chai.request(app)
            .get(faker.string.uuid())
            .end((err, response) => {
                if(err) done(err)
                response.should.have.status(404)
                response.should.have.property("body")
                response.body.should.be.an("object")
                response.body.should.have.property("error").deep.equal({
                    status_code: 404,
                    message: "Not Found"
                })
                done()
            })
    })

    after(done => {
        RequestLog.drop().then(() => done())
    })
})