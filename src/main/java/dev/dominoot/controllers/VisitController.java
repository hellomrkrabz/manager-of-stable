package dev.dominoot.controllers;

import dev.dominoot.models.VisitModel;
import dev.dominoot.services.VisitService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/visit")
@RestController
public class VisitController {
    private final VisitService visitService;

    @Autowired
    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> createVisit(@RequestBody VisitModel visit) {
        System.out.println("Received visit: " + visit);
        String response = visitService.saveVisit(visit);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> readVisits() {
        try {
            List<Map<String, Object>> visits = visitService.readVisits();
            return new ResponseEntity<>(visits, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();  // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/data/{id}")
    public ResponseEntity<VisitModel> getUserData(@PathVariable Integer id) {
        try {
            VisitModel visit = visitService.readVisit(id);
            return new ResponseEntity<>(visit, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();  // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

