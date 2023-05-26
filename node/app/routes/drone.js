const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const validations = require("app/validations");
const { droneExist, droneIsIdle, checkMedicationWeight } = require("app/middlewares");
const droneController = require("app/controllers/droneController");

router.post("/", [validate(validations.droneRegistration)], droneController.registerDrone);
router.get("/", [], droneController.getDrones);
router.get("/available", [], droneController.getIdleDrones);
router.get("/:id", [], droneController.getDrone);
router.post("/:id/load", [
    droneExist, droneIsIdle, validate(validations.droneLoad), checkMedicationWeight
], droneController.loadDroneWithMedications);

module.exports = router;