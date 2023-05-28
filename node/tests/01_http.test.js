const chai = require("chai");
const chaiHttp = require("chai-http");
const { faker } = require("@faker-js/faker")
const app = require("app");
const { RequestLog } = require("app/models/index");
const {sequelize} = require("../app/models");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Http Request", () => {

    before(done => {
        sequelize.sync({ force: true })
            .then(() => done())
            .catch(e => done(e))
    })

    it("Should log incoming request and response", done => {
        chai.request(app)
            .get("/ping")
            .end((err, response) => {
                if(err) done(err)
                RequestLog.findAll({ raw: true }).then(logs => {
                    expect(response).to.have.property("body")
                    expect(response.body).to.be.an("object")
                    expect(logs).to.be.an("array");
                    expect(logs.length).to.be.eql(1);
                    expect(logs[0]).to.have.property("endpoint").equal("/ping")
                    expect(logs[0]).to.have.property("response").deep.equal(JSON.stringify(response.body))
                    done()
                }).catch(e => {
                    done(e)
                })
            })
    })

    it("Should give 200 response with message 'Service is up' when pinged", done => {
        chai.request(app)
            .get("/ping")
            .end((err, response) => {
                if(err) done(err)
                expect(response).to.have.status(200)
                expect(response).to.have.property("body")
                expect(response.body).to.be.an("object")
                expect(response.body).to.have.property("data").deep.equal({
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
                expect(response).to.have.status(404)
                expect(response).to.have.property("body")
                expect(response.body).to.be.an("object")
                expect(response.body).to.have.property("error").deep.equal({
                    status_code: 404,
                    message: "Not Found"
                })
                done()
            })
    })

    after(done => {
        sequelize.drop().finally(() => done())
    })

})
