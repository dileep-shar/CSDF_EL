package com.example.csdf_el.model;

import lombok.Data;

import java.util.ArrayList;

@Data
public class UserModel {

    private String name;

    private String email;

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }
}
