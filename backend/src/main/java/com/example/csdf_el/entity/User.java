package com.example.csdf_el.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Set;


@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long userId;
    private String name;
    @Column(unique = true)
    private String email;


    @ManyToMany
    @JoinTable(
            name = "image_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id"))
    private Set<DockerImage> imageFiles;
}
