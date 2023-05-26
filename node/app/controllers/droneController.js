const Response = require("app/services/ServiceResponse")
const DroneService = require("app/services/DroneService");

module.exports = {

    registerDrone: (req, res) => {
        DroneService.registerDrone(req.body)
            .then(response => {
                (new Response(req, res)).success(response)
            })
            .catch(e => {
                (new Response(req, res)).error(e)
            })
    },

    getDrones: (req, res) => {
        DroneService.getAllDrones()
            .then(response => {
                (new Response(req, res)).success(response)
            })
            .catch(e => {
                (new Response(req, res)).error(e)
            })
    },

    getDrone: (req, res) => {
        DroneService.getDroneById(req.params.id)
            .then(response => {
                (new Response(req, res)).success(response)
            })
            .catch(e => {
                (new Response(req, res)).error(e)
            })
    },

}