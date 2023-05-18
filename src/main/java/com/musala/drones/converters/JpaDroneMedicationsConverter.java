package com.musala.drones.converters;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.musala.drones.drone.Medication;
import jakarta.persistence.AttributeConverter;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

public class JpaDroneMedicationsConverter implements AttributeConverter<List<Medication>, String> {
    @Autowired
    private Gson gson;

    @Override
    public String convertToDatabaseColumn(List<Medication> medications) {
        return gson.toJson(medications);
    }

    @Override
    public List<Medication> convertToEntityAttribute(String s) {
        return gson.fromJson(s, new TypeToken<List<Medication>>() {
        }.getType());
    }
}
