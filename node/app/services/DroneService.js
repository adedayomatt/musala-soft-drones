const { Drone, Medication } = require("app/models");
const { DroneNotFoundException } = require("app/exceptions");
const states = require("app/constants/states");

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
     * Get drones
     *
     * @param filter
     * @param include
     * @returns {Promise<Model[]>}     */

    static async getDrones(filter = {}, include = []) {
        return await Drone.findAll({
            where: filter,
            order: [ ['createdAt', 'DESC'] ],
            include
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


    /**
     * Load a drone with medications
     *
     * @param {<Model<any, TModelAttributes>} drone
     * @param {{}[]} medications
     * @returns {Promise<*|void>}
     */
    static async loadDroneWithMedications(drone, medications = []) {
        try {
            await drone.update({ state: states.LOADING })
            await Promise.all(medications.map(medication => Medication.create({
                droneId: drone.id,
                ...medication
            })).concat([drone.update({ state: states.LOADED })]))
            return await drone.reload({ include: ['medications'] })
        } catch (e) {
            throw e
        }
    }
}

module.exports = DroneService