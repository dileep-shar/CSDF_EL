package com.example.csdf_el.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Set;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DockerImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;
    @Column(unique = true)
    private String imageName;
    @NonNull
    @Column(columnDefinition = "JSON")
    private String report;

    @ManyToMany(mappedBy = "imageFiles",fetch = FetchType.EAGER)
    private Set<User> users;
}
