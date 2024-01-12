package dev.dominoot.controllers;

import dev.dominoot.models.RideModel;
import dev.dominoot.services.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/ride")
@RestController
public class RideController {
    private final RideService rideService;

    @Autowired
    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> createRide(@RequestBody RideModel ride) {
        String response = rideService.saveRide(ride);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/data/{date}")
    public ResponseEntity<List<Map<String, Object>>> getRideData(@PathVariable String date) {
        try {
            List<Map<String, Object>> rides = rideService.readRides(date);
            return new ResponseEntity<>(rides, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
