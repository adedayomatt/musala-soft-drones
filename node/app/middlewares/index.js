const { ValidationError } = require('express-validation');
const { RequestLog } = require('app/models');
const ServiceResponse = require("app/services/ServiceResponse");
const DroneService = require("app/services/DroneService");
const states = require("app/constants/states");
const { DroneNotIdleException, DroneWeightLimitExceededException } = require("app/exceptions")

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    requestLogger: async (req, res, next) => {
        try {
            req.log = await RequestLog.create({
                endpoint: req.originalUrl,
                method: req.method,
                request: JSON.stringify({
                    params: req.params,
                    payload: req.body,
                    headers: req.headers,
                })
            })
        } catch (e) {
            console.log("Could not log request--->", e)
        }
        next();
    },

    /**
     * Query drone by ID in the request param and append it to the request
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    droneExist: async (req, res, next) => {
        try {
            req.drone = await DroneService.getDroneById(req.params.id);
            next();
        } catch (e) {
            return (new ServiceResponse(req, res)).error(e)
        }
    },

    /**
     * Check that drone exist in the request and the drone state is idle
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    droneIsIdle: (req, res, next) => {
        if(req.drone && req.drone.state === states.IDLE) {
            next()
        } else {
            return (new ServiceResponse(req, res)).error(new DroneNotIdleException(req.drone))
        }
    },

    /**
     * Check weight of medications to ensure it does not exceed drone weight limit
     *
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    checkMedicationWeight: (req, res, next) => {
        const medications = req.body || [];
        const totalWeight = medications.map(m => m.weight).reduce((a,b) => a+b, 0);
        if(totalWeight > req.drone.weightLimit) return (new ServiceResponse(req, res)).error(new DroneWeightLimitExceededException(req.drone))
        next();
    },

    /**
     *
     * @param err
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    handleError: (err, req, res, next) => {
        if (err instanceof ValidationError) {
            return (new ServiceResponse(req, res)).error(err);
        }
        return (new ServiceResponse(req, res)).error({
            status_code: 500,
            message: "Internal server error",
            error: err
        });
    }
}