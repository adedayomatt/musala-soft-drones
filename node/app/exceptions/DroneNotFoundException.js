class DroneNotFoundException extends Error {
    constructor() {
        super("Invalid drone");
        this.status_code = 404;
    }
}

module.exports = DroneNotFoundException;