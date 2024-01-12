package dev.dominoot.controllers;

import dev.dominoot.models.HorseModel;
import dev.dominoot.services.HorseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/horse")
@RestController
public class HorseController {
    private final HorseService horseService;

    @Autowired
    public HorseController(HorseService horseService) {
        this.horseService = horseService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> createHorse(@RequestBody HorseModel horse) {
        String response = horseService.saveHorse(horse);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> readHorses() {
        try {
            List<Map<String, Object>> horses = horseService.readHorses();
            return new ResponseEntity<>(horses, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ownersHorses/{ownerId}")
    public ResponseEntity<List<Map<String, Object>>> readHorsesFromOwner(@PathVariable Integer ownerId) {
        try {
            List<Map<String, Object>> horses = horseService.readHorsesFromOwner(ownerId);
            return new ResponseEntity<>(horses, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/data/{id}")
    public ResponseEntity<HorseModel> getHorseData(@PathVariable Integer id) {
        try {
            HorseModel horse = horseService.readHorse(id);
            return new ResponseEntity<>(horse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/change/{id}")
    public ResponseEntity<String> updateHorse(@RequestBody HorseModel horse) {
        try {
            String response = horseService.updateHorse(horse);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            e.printStackTrace();  // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}

