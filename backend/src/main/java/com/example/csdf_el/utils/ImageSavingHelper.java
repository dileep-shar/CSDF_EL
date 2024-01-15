package com.example.csdf_el.utils;

import com.example.csdf_el.constants.Constant;
import com.example.csdf_el.dto.ImageAdder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;


@Component
public class ImageSavingHelper {
    @Value("${system.sudopassword}")
    String password;
    public static String fetchJSONObjectThroughCommand(ImageAdder image) throws IOException, InterruptedException {
        String fileName= "files/results/"+LocalDateTime.now().toString()+".json";
        String trivy_cmd="";
        if(image.getType().equals(Constant.TYPE_IMAGE_NAME)) {
            trivy_cmd = "trivy image --security-checks vuln --format json " + "-o " + fileName + " " + image.getImageName();
        }
        else if(image.getType().equals(Constant.TYPE_GITHUB_URL)){
            trivy_cmd="trivy repo --security-checks vuln --format json "+ "-o "+fileName+" "+ image.getGithubUrl();
        }
        String[] cmd = {"/bin/bash", "-c",trivy_cmd };
        Process proc = Runtime.getRuntime().exec(cmd);
        proc.waitFor();
        Path path= Paths.get(fileName);
        String jsonString= Files.readString(path);
        jsonString="{\n\"data\":"+jsonString+"\n}";
        JsonObject jsonObject = JsonParser.parseString(jsonString).getAsJsonObject();
        System.out.println(jsonObject.isJsonObject());
        assert jsonObject.isJsonObject();
        return jsonString;
    }
}
