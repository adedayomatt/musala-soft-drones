const { Drone } = require("app/models");
const { DroneNotFoundException } = require("app/exceptions")

class DroneService {

    /**
     * Register a new drone
     *
     * @param {{}} attributes
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    static async registerDrone(attributes = {}) {
        return await Drone.create(attributes);
    }

    /**
     * Get all drones
     * @param {string[]} include
     * @returns {Promise<Model[]>}
     */

    static async getAllDrones(include = []) {
        return await Drone.findAll({
            order: [
                ['createdAt', 'DESC']
            ], include
        });
    }


    /**
     * Get a drone by id
     *
     * @param {int} id
     * @param {string[]} include
     * @returns {Promise<Model<any, TModelAttributes>>}
     */

    static async getDroneById(id,include = []) {
        const drone = await Drone.findByPk(id, { include });
        if(!drone) throw new DroneNotFoundException;
        return drone;
    }

}

module.exports = DroneService