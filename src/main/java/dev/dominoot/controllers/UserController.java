package dev.dominoot.controllers;

import dev.dominoot.database.DBManager;
import dev.dominoot.models.UserModel;
import dev.dominoot.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/register")
@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserModel user) {
        System.out.println("Received user: " + user);
        userService.saveUser(user);
        return ResponseEntity.ok("User created successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> readUsers() {
        try {
            List<Map<String, Object>> users = userService.readUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();  // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
