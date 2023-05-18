package com.musala.drones.drone;

import com.musala.drones.enums.Model;
import com.musala.drones.enums.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DroneRepository extends JpaRepository<Drone, Long> {

    @Query("SELECT drone FROM Drone drone WHERE drone.state = ?1")
    List<Drone> findDronesByState(String state);

    @Query("SELECT drone FROM Drone drone WHERE drone.model = ?1")
    List<Drone> findDronesByModel(String model);
}
