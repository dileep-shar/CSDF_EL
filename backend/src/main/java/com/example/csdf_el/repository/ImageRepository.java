package com.example.csdf_el.repository;

import com.example.csdf_el.entity.DockerImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<DockerImage,Long> {

    public DockerImage findByImageName(String imageName);
}
