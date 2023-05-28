const {faker} = require("@faker-js/faker");
const models = require("app/constants/models");
const states = require("app/constants/states");
const mock = {
    /**
     * Valid drone registration request body
     *
     * @type {{serialNumber: string, model: string, state: string, batteryCapacity: number, weightLimit: number}}
     */
    drone: {
        model: faker.helpers.enumValue(models),
        state: faker.helpers.enumValue(states),
        weightLimit: faker.number.int({ max: 500 }),
        serialNumber: faker.string.alpha({ length: faker.number.int({ max: 100 }), casing: "mixed" }),
        batteryCapacity: faker.number.int({ min: 25, max: 100 })

    },
    /**
     * Valid medication item request body
     *
     * @param weight
     * @returns {{image: string, code: string, name: string, weight: number}}
     */
    medication: (weight) => {
        return {
            name: faker.helpers.fromRegExp(/[a-zA-Z_0-9-]{10}/),
            weight: faker.number.int(weight),
            code: faker.helpers.fromRegExp(/[A-Z_0-9]{5}/),
            image: faker.image.url()
        }
    }
}


module.exports = mock;