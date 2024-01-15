package com.example.csdf_el.service;

import com.example.csdf_el.entity.DockerImage;

import java.io.IOException;

public interface ImageService {
    DockerImage addOrUpdateImage(String imageName) throws IOException, InterruptedException;

    DockerImage addOrUpdateRepo(String githubUrl) throws IOException, InterruptedException;
}
