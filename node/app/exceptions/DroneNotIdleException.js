class DroneNotIdleException extends Error {
    constructor(drone) {
        super(`Drone is currently engaged...${drone ? drone.state.toLowerCase() : ""}`);
        this.status_code = 400;
    }
}

module.exports = DroneNotIdleException;