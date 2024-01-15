package com.example.csdf_el.service;


import com.example.csdf_el.entity.DockerImage;
import com.example.csdf_el.entity.User;
import com.example.csdf_el.model.ImageAdder;
import com.example.csdf_el.model.UserModel;
import com.example.csdf_el.repository.ImageRepository;
import com.example.csdf_el.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.io.IOException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;
    @Autowired
    private ImageRepository imageRepository;


    public User registerUser(UserModel userModel) {

        if (userRepository.findByEmail(userModel.getEmail()) != null)
            return userRepository.findByEmail(userModel.getEmail());
        User user = new User();
        user.setEmail(userModel.getEmail());
        user.setName(userModel.getName());
        user.setImageFiles(new HashSet<>());
        userRepository.save(user);
        return user;
    }

    @Override
    public DockerImage addImage(ImageAdder imageAdder) throws IOException, InterruptedException {
        System.out.println(imageAdder.getImageName());
        User user = userRepository.findByEmail(imageAdder.getUserEmail());
        Set<DockerImage> images = user.getImageFiles();
        for (DockerImage image : images) {
            if (image.getImageName().equals(imageAdder.getImageName()))
                return image;
        }
        System.out.println("Here");
        DockerImage result = imageService.addOrUpdateImage(imageAdder.getImageName());
        System.out.println("Here2");
        images.add(result);
        userRepository.save(user);
        return result;
    }

    @Override
    public boolean deleteImage(ImageAdder imageAdder) throws IOException, InterruptedException {
        User user = userRepository.findByEmail(imageAdder.getUserEmail());
        Set<DockerImage> images = user.getImageFiles();
        DockerImage imageToBeRemoved = null;
        for (DockerImage image : images) {
            if (image.getImageName().equals(imageAdder.getImageName())) {
                imageToBeRemoved = image;
                break;
            }
        }
        if (imageToBeRemoved != null) {
            images.remove(imageToBeRemoved);
            userRepository.save(user);
            return true;
        }

        return false;
    }

    @Override
    public ArrayList<String> fetchImages(UserModel userModel) {
        User user = userRepository.findByEmail(userModel.getEmail());
        List<DockerImage> allImages = imageRepository.findAll();

        ArrayList<String> ret = new ArrayList<>();
        for (DockerImage d : allImages) {
            if (d.getUsers().contains(user))
                ret.add(d.getReport());
        }
        return ret;
    }
}
