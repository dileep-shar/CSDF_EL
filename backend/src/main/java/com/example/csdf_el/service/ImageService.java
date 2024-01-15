package com.example.csdf_el.service;

import com.example.csdf_el.dto.ImageAdder;
import com.example.csdf_el.entity.DockerImage;

import java.io.IOException;

public interface ImageService {
    DockerImage addOrUpdateImage(ImageAdder image) throws IOException, InterruptedException;

}
