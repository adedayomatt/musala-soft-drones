const chai = require("chai");
const chaiHttp = require("chai-http");
const { faker } = require("@faker-js/faker")
const app = require("app");
const assertions = require("./assertions");
const mock = require("./mock");
const utils = require("./utils");
const models = require("../app/constants/models");
const states = require("../app/constants/states");
const {sequelize} = require("../app/models");
const endpoint = "/api/v1/drones";

chai.use(chaiHttp);

describe("Drone Registration", () => {

    before(done => {
        sequelize.sync({ force: true })
            .then(() => done())
            .catch(e => done(e))
    })

    it("Should return validation error when request field is empty", done => {
        chai.request(app)
            .post(endpoint)
            .send({})
            .end((err, response) => {
                if(err) done(err);
                assertions.validationErrorResponseCheck(response)
                done()
            })
    })

    it("Should return validation error when drone serial number is more than 100 character", done => {
        const data = {
            ...mock.drone,
            serialNumber: faker.string.alpha({ length: 101 }),
        }
        chai.request(app)
            .post(endpoint)
            .send(data)
            .end((err, response) => {
                if(err) done(err);
                assertions.validationErrorResponseCheck(response)
                done()
            })
    })

    it("Should return validation error when weight limit is greater that 500", done => {
        const data = {
            ...mock.drone,
            weightLimit: faker.number.int({ min: 500 }),
        }
        chai.request(app)
            .post(endpoint)
            .send(data)
            .end((err, response) => {
                if(err) done(err);
                assertions.validationErrorResponseCheck(response)
                done()
            })
    })

    it("Should return validation error when model is not valid", done => {
        const data = {
            ...mock.drone,
            model: utils.randomExcluding(() =>  {
                return faker.string.alpha({
                    length: faker.number.int({ min: 5, max: 20 }),
                    casing: "mixed",
                })
            }, Object.values(models) )
        }
        chai.request(app)
            .post(endpoint)
            .send(data)
            .end((err, response) => {
                if(err) done(err);
                assertions.validationErrorResponseCheck(response)
                done()
            })
    })

    it("Should return validation error when state is not valid", done => {
        const data = {
            ...mock.drone,
            state: utils.randomExcluding(() => {
                return faker.string.alpha({
                    length: faker.number.int({ min: 5, max: 10 }),
                    casing: "mixed",
                })
            }, Object.values(states) )
        }
        chai.request(app)
            .post(endpoint)
            .send(data)
            .end((err, response) => {
                if(err) done(err);
                assertions.validationErrorResponseCheck(response)
                done()
            })
    })

    it("Should register a drone successfully", done => {
        const data = mock.drone
        chai.request(app)
            .post(endpoint)
            .send(data)
            .end((err, response) => {
                if(err) done(err);
                assertions.droneSuccessfulRegistrationResponseCheck(data, response)
                done()
            })
    })

    after(done => {
        sequelize.drop().finally(() => done())
    })

})
