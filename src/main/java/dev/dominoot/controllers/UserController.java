package dev.dominoot.controllers;

import dev.dominoot.models.UserModel;
import dev.dominoot.services.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api")
@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody UserModel user) {
        String response = userService.saveUser(user);
        return ResponseEntity.ok(response);
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

    @PostMapping("/{username}")
    public ResponseEntity<String> readUser(@PathVariable String username, @RequestBody UserModel user) {
        String pword = user.getPassword();
        try {
            JSONObject response = userService.validateUser(username, pword);
            return ResponseEntity.ok(response.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/data/{username}")
    public ResponseEntity<UserModel> getUserData(@PathVariable String username) {
        try {
            UserModel user = userService.readUser(username);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();  // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/dataID/{id}")
    public ResponseEntity<UserModel> getUserDataId(@PathVariable Integer id) {
        try {
            UserModel user = userService.readUserId(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();  // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/change/{username}")
    public ResponseEntity<String> updateUser(@PathVariable String username, @RequestBody UserModel user) {
        try {
            String response = userService.updateUser(user);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            e.printStackTrace();  // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/unassignedUsers")
    public ResponseEntity<List<Map<String, Object>>> getUnassignedUsers() {
        try {
            List<Map<String, Object>> users = userService.readUnassignedUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();  // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/switchRole/{username}")
    public ResponseEntity<String> switchRole(@PathVariable String username, @RequestBody UserModel user) {
        try {
            String response = userService.switchRole(user);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            e.printStackTrace();  // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

