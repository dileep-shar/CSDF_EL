package com.example.csdf_el.service;

import com.example.csdf_el.entity.DockerImage;
import com.example.csdf_el.entity.User;
import com.example.csdf_el.dto.ImageAdder;
import com.example.csdf_el.dto.UserModel;
import com.google.gson.JsonObject;

import java.io.IOException;
import java.util.ArrayList;

public interface UserService {
    User registerUser(UserModel userModel);

    DockerImage addImage(ImageAdder imageAdder) throws IOException, InterruptedException;

    boolean deleteImage(ImageAdder imageAdder) throws IOException, InterruptedException;

    ArrayList<JsonObject> fetchImages(UserModel userModel);

}
