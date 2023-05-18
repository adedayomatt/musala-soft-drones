package com.musala.drones.drone;

import com.musala.drones.enums.Model;
import com.musala.drones.enums.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DroneService {

    private final DroneRepository droneRepository;

    @Autowired
    public DroneService(DroneRepository droneRepository) {
        this.droneRepository = droneRepository;
    }

    public Drone registerDrone(Drone drone) {
        droneRepository.save(drone);
        return drone;
    }

    public List<Drone> getDrones() {
        return droneRepository.findAll();
    }

    public Optional<Drone> getDrone(Long id) {
        Optional<Drone> drone = droneRepository.findById(id);
        if(drone.isEmpty()) throw new IllegalStateException("No Drone Found");
        return drone;
    }

}
