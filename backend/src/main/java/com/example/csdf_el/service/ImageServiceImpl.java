package com.example.csdf_el.service;


import com.example.csdf_el.entity.DockerImage;
import com.example.csdf_el.repository.ImageRepository;
import com.example.csdf_el.utils.ImageSavingHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    ImageSavingHelper imageSavingHelper;

    @Override
    public DockerImage addOrUpdateImage(String imageName) throws IOException, InterruptedException {
//        try {

        if(imageRepository.findByImageName(imageName)!=null){
            return imageRepository.findByImageName(imageName);
        }
        String report = imageSavingHelper.fetchJSONObjectThroughCommandForImageId(imageName);
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

    @Override
    public DockerImage addOrUpdateRepo(String githubUrl) throws IOException, InterruptedException {

        if(imageRepository.findByImageName(githubUrl)!=null){
            return imageRepository.findByImageName(githubUrl);
        }
        String report = imageSavingHelper.fetchJSONObjectThroughCommandForGithubRepo(githubUrl);
        DockerImage dockerImage = new DockerImage();
        dockerImage.setReport(report);
        dockerImage.setImageName(githubUrl);
        imageRepository.save(dockerImage);
//        } catch (Exception e) {
//            System.out.println("Exception" + e);
//            return null;
//        }
        return dockerImage;
    }
}
