package com.musala.drones.utils;

import com.musala.drones.drone.Medication;

import java.util.List;

public class MedicationUtils {

    public static Double calculateTotalWeight(List<Medication> medications) {
        Double totalWeight = 0.0;
        for (Medication medication: medications) {
            totalWeight += medication.getWeight();
        }
        return totalWeight;
    }

}
