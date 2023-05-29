const status = require('app/constants/status');

class ServiceResponse {

    constructor(req, res) {
        this.request = req;
        this.response = res
        this.response.header('Access-Control-Allow-Origin', '*');
        this.response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        this.response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }

    /**
     * Send a success initialResponse
     *
     * @param data
     * @param message
     * @param status_code
     * @returns {*}
     */
    success(data, message = "Request Successful", status_code = 200) {
        if (this.request.method === "OPTIONS") {
            return this.response.status(200).end();
        }
        const response = {
            status: status.SUCCESS,
            message: message,
            data: data
        }
        return this.response.status(status_code).json(response);
    }

    /**
     * Send an error initialResponse
     *
     * @param e
     * @param message
     * @returns {*}
     */
    error(e, message = "Request Failed") {
        const statusCode = e.statusCode || e.status_code || 500;
        if (this.request.method === "OPTIONS") {
            return this.response.status(statusCode).end();
        }
        const response = {
            status: status.ERROR,
            message: e.message || message,
            code: e.code,
            error: e
        }
        return this.response.status(statusCode).json(response);
    }
}

module.exports = ServiceResponse