package com.example.csdf_el.service;


import com.example.csdf_el.constants.Constant;
import com.example.csdf_el.dto.ImageAdder;
import com.example.csdf_el.entity.DockerImage;
import com.example.csdf_el.repository.ImageRepository;
import com.example.csdf_el.utils.ImageSavingHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Objects;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    ImageSavingHelper imageSavingHelper;

    @Override
    public DockerImage addOrUpdateImage(ImageAdder image) throws IOException, InterruptedException {
//        try {
        String imageName=image.getImageName();
        if(imageRepository.findByImageName(imageName)!=null){
            return imageRepository.findByImageName(imageName);
        }

        String report = imageSavingHelper.fetchJSONObjectThroughCommand(image);
        DockerImage dockerImage = new DockerImage();
        dockerImage.setReport(report);
        dockerImage.setImageName(imageName);
        imageRepository.save(dockerImage);
//        } catch (Exception e) {
//            System.out.println("Exception" + e);
//            return null;
//        }
        return dockerImage;
    }
}
