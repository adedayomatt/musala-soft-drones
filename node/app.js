const express = require('express');
const cors = require('cors');
const config = require('app/config/config');
const droneRoutes = require("app/routes/drone")
const { requestLogger, handleError } = require("app/middlewares")
const ServiceResponse = require("app/services/ServiceResponse");

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(cors());
app.use(requestLogger)

app.get("/ping", (req, res) => {
    (new ServiceResponse(req, res)).success({ message: "Service is up!" })
})
app.use("/api/v1/drones", droneRoutes )
app.use("/", (req, res) => {
    (new ServiceResponse(req, res)).error({
        status_code: 404,
        message: "Not Found"
    })
});
app.use(handleError)

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`)
});

module.exports = app;