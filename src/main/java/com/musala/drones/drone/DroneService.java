package com.musala.drones.drone;

import com.musala.drones.enums.Model;
import com.musala.drones.enums.State;
import com.musala.drones.utils.MedicationUtils;
import com.musala.drones.validators.DroneValidator;
import com.musala.drones.validators.MedicationValidator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DroneService {

    private final DroneRepository droneRepository;

    @Autowired
    private MedicationValidator medicationValidator;

    @Autowired
    private DroneValidator droneValidator;

    @Autowired
    public DroneService(DroneRepository droneRepository) {
        this.droneRepository = droneRepository;
    }

    public Drone registerDrone(Drone drone) {
        if(!droneValidator.setDrone(drone).isValid()) throw new IllegalStateException("Invalid drone data");
        droneRepository.save(drone);
        return drone;
    }

    public List<Drone> getDrones() {
        return droneRepository.findAll();
    }

    public Drone getDrone(Long id) {
        return droneRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Drone with id "+id+" does not exist"));
    }

    @Transactional
    public List<Medication> loadDrone(Long id, List<Medication> medications) {
        Drone drone = getDrone(id);
        if(!drone.isIdle()) throw new IllegalStateException("Drone is occupied at the moment");
        if(!drone.canTakeWeight(MedicationUtils.calculateTotalWeight(medications)))
            throw new IllegalStateException("Drone cannot take the weights of the medications");
        for (Medication medication: medications) {
            if(!medicationValidator.setMedication(medication).isValid())
                throw new IllegalStateException("One or more medication is not valid");
            break;
        }
        drone.setMedications(medications);
        drone.setState(State.LOADED);
        return drone.getMedications();
    }

}
