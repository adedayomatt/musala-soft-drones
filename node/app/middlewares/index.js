const { ValidationError } = require('express-validation');
const { RequestLog } = require('app/models');
const ServiceResponse = require("app/services/ServiceResponse");

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