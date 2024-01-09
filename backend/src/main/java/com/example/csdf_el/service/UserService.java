package com.example.csdf_el.service;

import com.example.csdf_el.entity.DockerImage;
import com.example.csdf_el.entity.User;
import com.example.csdf_el.model.ImageAdder;
import com.example.csdf_el.model.UserModel;
import java.io.IOException;
import java.util.ArrayList;

public interface UserService {
    User registerUser(UserModel userModel);

    DockerImage addImage(ImageAdder imageAdder) throws IOException, InterruptedException;

    boolean deleteImage(ImageAdder imageAdder) throws IOException, InterruptedException;

    ArrayList<String> fetchImages(UserModel userModel);
}
