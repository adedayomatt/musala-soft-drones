package com.musala.drones.drone;

import jakarta.persistence.*;

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
    private Float weightLimit;
    private String serialNumber;
    private Integer batteryCapacity;
    @Column(columnDefinition = "enum('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING') default 'IDLE'")
    private String state;
    @Column(columnDefinition = "enum('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight') default 'Lightweight'")
    private String model;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getWeightLimit() {
        return weightLimit;
    }

    public void setWeightLimit(Float weightLimit) {
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

    public void setState(String state) {
        this.state = state;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
