const states = {
    IDLE: "idle",
    LOADING: "loading",
    LOADED: "loaded",
    DELIVERING: "delivering",
    DELIVERED: "delivered",
    RETURNING: "returning",

    allStates: () => [states.IDLE, states.LOADING, states.LOADED, states.DELIVERING, states.DELIVERED, states.RETURNING]
};

module.exports = states