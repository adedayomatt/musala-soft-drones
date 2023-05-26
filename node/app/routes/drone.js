const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const validations = require("app/validations")
const droneController = require("app/controllers/droneController")

router.post("/", [validate(validations.droneRegistration)], droneController.registerDrone);
router.get("/", [], droneController.getDrones);
router.get("/:id", [], droneController.getDrone);

module.exports = router;