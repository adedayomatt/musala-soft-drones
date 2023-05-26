const express = require("express");
const router = express.Router();
const droneController = require("app/controllers/droneController")

router.post("/", [], droneController.registerDrone);
router.get("/", [], droneController.getDrones);
router.get("/:id", [], droneController.getDrone);

module.exports = router;