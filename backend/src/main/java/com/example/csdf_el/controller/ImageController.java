package com.example.csdf_el.controller;

import com.example.csdf_el.constants.Constant;
import com.example.csdf_el.entity.DockerImage;
import com.example.csdf_el.dto.ImageAdder;
import com.example.csdf_el.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ImageController {
    @Autowired
    private ImageService imageService;

    @PostMapping("/image/addOrUpdate")
    public String registerUser(@RequestBody ImageAdder imageAdder) throws IOException, InterruptedException {
        DockerImage result;
             if(imageAdder.getType().equals(Constant.TYPE_IMAGE_NAME))
                result =  imageService.addOrUpdateImage(imageAdder.getImageName());
             else if(imageAdder.getType().equals(Constant.TYPE_GITHUB_URL))
                 result  =imageService.addOrUpdateRepo(imageAdder.getGithubUrl());
        return "Status:200";
    }
}
