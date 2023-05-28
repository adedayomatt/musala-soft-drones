const chai = require("chai");
const expect = chai.expect;
const states = require("app/constants/states");

module.exports = {
    /**
     * Assertions for validation error response
     *
     * @param res
     */
    validationErrorResponseCheck: res => {
        expect(res).to.have.status(400)
        expect(res).to.have.property("body")
        expect(res.body).to.be.an("object")
        expect(res.body).to.have.property("status").equal("error")
        expect(res.body).to.have.property("error")
        expect(res.body.error).to.be.an("object")
        expect(res.body.error).to.have.property("name").equal("ValidationError")
    },

    /**
     * Assertions for successful drone registrations
     *
     * @param drone
     * @param res
     */
    droneSuccessfulRegistrationResponseCheck: (drone, res) => {
        expect(res).to.have.status(200)
        expect(res).to.have.property("body")
        expect(res.body).to.be.an("object")
        expect(res.body).to.have.property("status").equal("success")
        expect(res.body).to.have.property("data").to.be.an("object")
        expect(res.body.data).to.have.property("id")
        for (const key in drone) {
            expect(res.body.data).to.have.property(key).equal(drone[key])
        }
    },

    /**
     * Assertion for loading drone with over weighted medications
     *
     * @param drone
     * @param medications
     * @param res
     */
    droneLoadedWithOverWeightedMedications: (drone, medications, res) => {
        expect(res).to.have.status(400)
        expect(res).to.have.property("body")
        expect(res.body).to.be.an("object")
        expect(res.body).to.have.property("status").equal("error")
        expect(res.body).to.have.property("message").equal(`Weight limit of ${drone.weightLimit} is exceeded`)
    },

    /**
     * Assertion for loading drone when drone is not idle
     *
     * @param drone
     * @param medications
     * @param res
     */
    droneNotIdleWhenLoading: (drone, medications, res) => {
        expect(res).to.have.status(400)
        expect(drone).to.have.property("state").not.equal(states.IDLE)
        expect(res).to.have.property("body")
        expect(res.body).to.be.an("object")
        expect(res.body).to.have.property("status").equal("error")
        expect(res.body).to.have.property("message").equal(`Drone is currently engaged...${drone.state.toLowerCase()}`)
    },

    /**
     * Assertions for successfully loaded drone
     *
     * @param drone
     * @param medications
     * @param res
     */
    droneLoadedWithMedicationsSuccessfully: (drone, medications, res) => {
        expect(res).to.have.status(200)
        expect(res).to.have.property("body")
        expect(res.body).to.be.an("object")
        expect(res.body).to.have.property("status").equal("success");
        expect(res.body).to.have.property("data").to.be.an("object");
        expect(res.body.data).to.have.property("id").equal(drone.id)
        expect(res.body.data).to.have.property("state").equal(states.LOADED)
        expect(res.body.data).to.have.property("medications");
        expect(res.body.data.medications).to.be.an("array");
        expect(res.body.data.medications.length).to.be.equal(medications.length);
        expect(medications.every(medication => {
            const loaded =  res.body.data.medications
                .find(m => Object.keys(medication).every(k => m[k] === medication[k]))
            return !!loaded
        })).to.be.true
    }

}