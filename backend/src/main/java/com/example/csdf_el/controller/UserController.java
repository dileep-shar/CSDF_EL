package com.example.csdf_el.controller;

import com.example.csdf_el.entity.DockerImage;
import com.example.csdf_el.entity.User;
import com.example.csdf_el.model.ImageAdder;
import com.example.csdf_el.model.UserModel;
import com.example.csdf_el.service.UserService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    // Validation of user if he exists or not.
    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody UserModel userModel) {
        User user = userService.registerUser(userModel);
        return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
    }

    @PostMapping("/user/addImage")
    public ResponseEntity<?> addImage(@RequestBody ImageAdder imageAdder) {
        try {
            DockerImage image = userService.addImage(imageAdder);
            return new ResponseEntity<>(image.getReport(), HttpStatus.ACCEPTED);
        } catch (Exception e) {
//            throw new RuntimeException(e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//            throw new RuntimeException(e);
        }
    }
    @PostMapping("/user/uploadImage")
    public ResponseEntity<?> uploadImage(@RequestBody ImageAdder imageAdder){
        return new ResponseEntity<>("Not Implemented", HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/user/deleteImage")
    public ResponseEntity<?> removeImage(@RequestBody ImageAdder imageAdder){
        return new ResponseEntity<>("Not Implemented", HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/user/fetchAllImages")
    public ResponseEntity<?> fetchAllImages(@RequestBody UserModel userModel) {
        try {
            ArrayList<String> imageResults = userService.fetchImages(userModel);
            Gson gson = new Gson();
            System.out.println(imageResults);
            String jsonArray = gson.toJson(imageResults);
            JsonObject returner = new JsonObject();
            returner.addProperty("reports", jsonArray);
            returner.addProperty("status", "200");
            returner.addProperty("message", "okay");

            return new ResponseEntity<>(returner.getAsString(), HttpStatus.ACCEPTED);

        } catch (Exception e) {
            e.printStackTrace();

            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
