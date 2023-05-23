package com.musala.drones.validators;

import com.musala.drones.drone.Drone;
import com.musala.drones.enums.Model;
import com.musala.drones.enums.State;
import org.springframework.stereotype.Service;

@Service
public class DroneValidator implements ValidatorInterface {
    private Drone drone;

    public Drone getDrone() {
        return drone;
    }

    public DroneValidator setDrone(Drone drone) {
        this.drone = drone;
        return this;
    }

    public Boolean serialNumberValid() {
        return drone.getSerialNumber().matches("^[a-zA-Z]+$")
                && drone.getSerialNumber().length() <= 100;
    }

    public Boolean modelValid() {
        for (Model model : Model.values()) {
            if (model.name().equals(drone.getModel())) {
                return true;
            }
        }
        return false;
    }

    public Boolean stateValid() {
        for (State state : State.values()) {
            if (state.name().equals(drone.getState())) {
                return true;
            }
        }
        return false;
    }

    public Boolean weightLimitValid() {
        return drone.getWeightLimit() <= 500;
    }

    @Override
    public Boolean isValid() {
        return serialNumberValid() && modelValid() && stateValid() && weightLimitValid();
    }
}
