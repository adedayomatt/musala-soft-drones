class DroneBatteryCapacityLowException extends Error {
    constructor(drone) {
        super(`Drone battery level low...${drone ? drone.batteryCapacity+'%' : ""}`);
        this.status_code = 400;
    }
}

module.exports = DroneBatteryCapacityLowException;