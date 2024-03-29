const { Joi } = require('express-validation');
const models = require("app/constants/models");
const states = require("app/constants/states");

module.exports = {

    droneRegistration: {
        body: Joi.object({
            model: Joi.string().valid(
                models.HEAVYWEIGHT, models.CRUISEWEIGHT, models.MIDDLEWEIGHT, models.LIGHTWEIGHT
            ).required(),
            state: Joi.string().valid(
                states.IDLE, states.LOADED, states.LOADING, states.DELIVERING, states.DELIVERED, states.RETURNING
            ).optional(),
            weightLimit: Joi.number().max(500).required(),
            serialNumber: Joi.string().max(100).regex(/^[a-zA-Z]+$/).required(),
            batteryCapacity: Joi.number().integer().max(100).required()
        })
    },

    droneLoad: {
        body: Joi.array().items(Joi.object({
            name: Joi.string().regex(/^[a-zA-Z_0-9-]+$/).required(),
            weight: Joi.number().required(),
            code: Joi.string().regex(/^[A-Z_0-9]+$/).required(),
            image: Joi.string().required()
        })).min(1).required()
    }
};
