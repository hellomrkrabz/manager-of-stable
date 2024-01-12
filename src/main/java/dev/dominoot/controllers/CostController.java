package dev.dominoot.controllers;

import dev.dominoot.models.CostModel;
import dev.dominoot.services.CostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/cost")
@RestController
public class CostController {
    private final CostService costService;

    @Autowired
    public CostController(CostService costService) {
        this.costService = costService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> createCost(@RequestBody CostModel cost) {
        String response = costService.saveCost(cost);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/data/{date}")
    public ResponseEntity<List<Map<String, Object>>> getCostData(@PathVariable String date) {
        try {
            List<Map<String, Object>> costs = costService.readCosts(date);
            return new ResponseEntity<>(costs, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
