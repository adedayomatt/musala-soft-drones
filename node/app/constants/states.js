const states = {
    IDLE: "IDLE",
    LOADING: "LOADING",
    LOADED: "LOADED",
    DELIVERING: "DELIVERING",
    DELIVERED: "DELIVERED",
    RETURNING: "RETURNING",

    allStates: () => [states.IDLE, states.LOADING, states.LOADED, states.DELIVERING, states.DELIVERED, states.RETURNING]
};

module.exports = states