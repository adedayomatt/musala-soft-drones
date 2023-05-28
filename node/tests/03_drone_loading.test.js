const chai = require("chai");
const chaiHttp = require("chai-http");
const { faker } = require("@faker-js/faker")
const app = require("app");
const assertions = require("./assertions");
const mock = require("./mock");
const utils = require("./utils");
const states = require("app/constants/states");
const {sequelize} = require("app/models");
const endpoint = "/api/v1/drones";

chai.use(chaiHttp);

describe("Drone loading with medications", () => {

    before(done => {
        sequelize.sync({ force: true })
            .then(() => done())
            .catch(e => done(e))
    })

    it("Should return error when drone is not idle", done => {
        let drone = {
            ...mock.drone,
            state: utils.randomExcluding(() => faker.helpers.enumValue(states), [states.IDLE])
        }
        let medications = [];
        chai.request(app)
            .post(endpoint)
            .send(drone)
            .then(res => {
                assertions.droneSuccessfulRegistrationResponseCheck(drone, res);
                drone = res.body.data;
                const itemCount = faker.number.int({ min: 3, max: 10 })
                medications = Array.from(Array(itemCount))
                    .map(() => mock.medication( Math.floor(res.body.data.weightLimit / itemCount)));
                return chai.request(app).post(`${endpoint}/${res.body.data.id}/load`)
                    .send(medications)
            })
            .then(res => {
                assertions.droneNotIdleWhenLoading(drone, medications, res)
                done()
            })
            .catch(e => done(e))
    })

    it("Should return error when medications weight is more than drone weight limit", done => {
        let drone = {
            ...mock.drone,
            state: states.IDLE
        }
        let medications = [];
        chai.request(app)
            .post(endpoint)
            .send(drone)
            .then(res => {
                assertions.droneSuccessfulRegistrationResponseCheck(drone, res);
                drone = res.body.data;
                const itemCount = faker.number.int({ min: 3, max: 10 })
                medications = Array.from(Array(itemCount))
                    .map(() => mock.medication({ min: Math.floor(res.body.data.weightLimit / itemCount) }));
                return chai.request(app).post(`${endpoint}/${res.body.data.id}/load`)
                    .send(medications)
            })
            .then(res => {
                assertions.droneLoadedWithOverWeightedMedications(drone, medications, res)
                done()
            })
            .catch(e => done(e))
    })

    it("Should load drone with medications successfully", done => {
            let drone = {
                ...mock.drone,
                state: states.IDLE
            }
            let medications = [];
            chai.request(app)
                .post(endpoint)
                .send(drone)
                .then(res => {
                    assertions.droneSuccessfulRegistrationResponseCheck(drone, res);
                    drone = res.body.data;
                    const itemCount = faker.number.int({ min: 3, max: 10 })
                    medications = Array.from(Array(itemCount))
                        .map(() => mock.medication(Math.floor(res.body.data.weightLimit/itemCount)));
                    return chai.request(app).post(`${endpoint}/${res.body.data.id}/load`)
                        .send(medications)
                })
                .then(res => {
                    assertions.droneLoadedWithMedicationsSuccessfully(drone, medications, res)
                    done()
                })
                .catch(e => done(e))
        })

    after(done => {
        sequelize.drop().finally(() => done())
    })

})
