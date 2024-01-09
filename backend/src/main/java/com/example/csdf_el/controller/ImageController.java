package com.example.csdf_el.controller;

import com.example.csdf_el.entity.DockerImage;
import com.example.csdf_el.entity.User;
import com.example.csdf_el.model.ImageAdder;
import com.example.csdf_el.model.UserModel;
import com.example.csdf_el.service.ImageService;
import com.example.csdf_el.service.UserService;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class ImageController {
    @Autowired
    private ImageService imageService;

    @PostMapping("/image/addOrUpdate")
    public String registerUser(@RequestBody ImageAdder imageAdder) throws IOException, InterruptedException {
        DockerImage result =  imageService.addOrUpdateImage(imageAdder.getImageName());
        return "Status:200";
    }
}
