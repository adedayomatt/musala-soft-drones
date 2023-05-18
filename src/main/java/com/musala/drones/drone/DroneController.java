package com.musala.drones.drone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/drones")
public class DroneController {

    private final DroneService droneService;

    @Autowired
    public DroneController(DroneService droneService) {
        this.droneService = droneService;
    }

    @PostMapping
    public Drone registerDrone(@RequestBody Drone drone) {
        return droneService.registerDrone(drone);
    }

    @GetMapping
    public List<Drone> getDrones() {
        return droneService.getDrones();
    }

    @GetMapping(path = "/{id}")
    public Drone getDrone(@PathVariable("id") Long id) {
        return droneService.getDrone(id);
    }

    @PostMapping(path = "/{id}/load")
    public List<Medication> loadDrone(@PathVariable("id") Long id, @RequestBody List<Medication> medications) {
        return droneService.loadDrone(id, medications);
    }

}
