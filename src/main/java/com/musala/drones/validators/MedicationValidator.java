package com.musala.drones.validators;

import com.musala.drones.drone.Medication;
import org.springframework.stereotype.Service;

@Service
public class MedicationValidator implements ValidatorInterface {
    private Medication medication;

    public Medication getMedication() {
        return medication;
    }

    public MedicationValidator setMedication(Medication medication) {
        this.medication = medication;
        return this;
    }

    public Boolean nameValid() {
        return medication.getName().matches("^[a-zA-Z_0-9-]+$");
    }

    public Boolean codeValid() {
        return medication.getCode().matches("^[A-Z_0-9]+$");
    }

    @Override
    public Boolean isValid() {
        return nameValid() && codeValid();
    }
}
