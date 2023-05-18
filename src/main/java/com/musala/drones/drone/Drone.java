package com.musala.drones.drone;

import com.musala.drones.converters.JpaDroneMedicationsConverter;
import com.musala.drones.enums.Model;
import com.musala.drones.enums.State;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table
public class Drone {
    @Id
    @SequenceGenerator(
            name = "drone_sequence",
            sequenceName = "drone_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "drone_sequence"
    )
    private Long id;
    private Double weightLimit;
    private String serialNumber;
    private Integer batteryCapacity;
    @Column(columnDefinition = "enum('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING') default 'IDLE'")
    private String state;
    @Column(columnDefinition = "enum('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight') default 'Lightweight'")
    private String model;

    @Column(columnDefinition = "json")
    @Convert(converter = JpaDroneMedicationsConverter.class)
    private List<Medication> medications;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getWeightLimit() {
        return weightLimit;
    }

    public void setWeightLimit(Double weightLimit) {
        this.weightLimit = weightLimit;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Integer getBatteryCapacity() {
        return batteryCapacity;
    }

    public void setBatteryCapacity(Integer batteryCapacity) {
        this.batteryCapacity = batteryCapacity;
    }

    public String getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state.name();
    }

    public String getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model.name();
    }

    public List<Medication> getMedications() {
        return medications == null ? new ArrayList<>() : medications;
    }

    public void setMedications(List<Medication> medications) {
        this.medications = medications;
    }

    public Boolean canTakeWeight(Double weight) {
        return getWeightLimit() >= weight;
    }

    public Boolean isIdle() {
        return Objects.equals(getState(), State.IDLE.name());
    }
}
