class DroneWeightLimitExceededException extends Error {
    constructor(drone) {
        super(`Weight limit of ${drone.weightLimit} is exceeded`);
        this.status_code = 400;
    }
}

module.exports = DroneWeightLimitExceededException;