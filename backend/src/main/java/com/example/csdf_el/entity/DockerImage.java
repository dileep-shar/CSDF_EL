package com.example.csdf_el.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DockerImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;
    private String imageName;
    @NonNull
    @Column(columnDefinition = "JSON")
    private String report;

    public String getReport() {
        return report;
    }


    public void setReport(String report) {
        this.report = report;
    }

    @ManyToMany(mappedBy = "imageFiles")
    private ArrayList<User> users;
}
