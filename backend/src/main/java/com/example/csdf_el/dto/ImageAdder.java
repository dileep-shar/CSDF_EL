package com.example.csdf_el.dto;

import lombok.Data;

import java.io.File;

@Data
public class ImageAdder {
    private String userName;
    private String imageName;
    private String userType;
    private String userEmail;
    private File tarFile;
    private String githubUrl;
    private String type;
}
