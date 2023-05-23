package com.musala.drones;

import com.google.gson.Gson;
import com.musala.drones.drone.Drone;
import com.musala.drones.drone.DroneService;
import com.musala.drones.enums.Model;
import com.musala.drones.enums.State;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class DronesApplicationTests {

	@Autowired
	private DroneService droneService;

	@Autowired
	private MockMvc mvc;

	@Autowired
	private Gson gson;

	@Test
	void contextLoads() {
	}

	@Test
	public void droneCanBeRegisteredWhenDataAreValid() throws Exception {
		Drone requestDrone = new Drone();
		requestDrone.setWeightLimit(500.0);
		requestDrone.setModel(Model.Lightweight);
		requestDrone.setState(State.IDLE);
		requestDrone.setBatteryCapacity(90);
		requestDrone.setSerialNumber("AAAA");
		mvc.perform(post("/api/v1/drones")
						.contentType("application/json")
						.content(gson.toJson(requestDrone))
				)
				.andExpect(status().isOk())
				.andExpect(status().is2xxSuccessful())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
	}

}
