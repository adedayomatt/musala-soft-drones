const Response = require("app/services/ServiceResponse")
const DroneService = require("app/services/DroneService");
const states = require("app/constants/states");

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
        DroneService.getDrones()
            .then(response => {
                (new Response(req, res)).success(response)
            })
            .catch(e => {
                (new Response(req, res)).error(e)
            })
    },

    getIdleDrones: (req, res) => {
        DroneService.getDrones({ state: states.IDLE })
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

    getDroneLoadedMedications: (req, res) => {
        DroneService.getDroneLoadedMedications(req.drone.id)
            .then(response => {
                (new Response(req, res)).success(response)
            })
            .catch(e => {
                (new Response(req, res)).error(e)
            })
    },

    getDroneBatteryLevel: (req, res) => {
        (new Response(req, res)).success(req.drone.batteryCapacity)
    },

    loadDroneWithMedications: (req, res) => {
        DroneService.loadDroneWithMedications(req.drone, req.body)
            .then(response => {
                (new Response(req, res)).success(response)
            })
            .catch(e => {
                (new Response(req, res)).error(e)
            })
    },

}