const { Op } = require("sequelize")
const cron = require("node-cron");
const { DroneBatteryAudit } = require("app/models");
const DroneService = require("app/services/DroneService")
const states = require("app/constants/states");

/**
 *
 * This task tracks battery level of drones that are not idle.
 * battery capacity is assumed to reduce by 2% every minute the drone is not idle
 *
 * @returns {Promise<void>}
 */
const auditBattery = async () => {
    const loadedDrones = await DroneService.getDrones({
        [Op.and]: [
            { state: {[Op.not]: states.IDLE} },
            { batteryCapacity: {[Op.gte]: 0}}
        ]
    });
    for (const drone of loadedDrones) {
        const batteryLevel = drone.batteryCapacity - 2
        await Promise.all([
            DroneBatteryAudit.create({
                droneId: drone.id,
                state: drone.state,
                batteryLevel
            }),
            drone.update({ batteryCapacity: batteryLevel }),
        ])
    }
}
module.exports = cron.schedule("* * * * *", auditBattery);