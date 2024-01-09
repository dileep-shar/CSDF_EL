package com.example.csdf_el.utils;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;


@Component
public class ImageSavingHelper {
    @Value("${system.sudopassword}")
    String password;

    public String fetchJSONObjectThroughCommandForImageId(String imageId) throws IOException, InterruptedException {


        String[] cmd = {"/bin/bash", "-c", "echo " + password + "|sudo trivy image --security-checks vuln --format json " + imageId};
//        String[] cmd = {"/bin/bash", "-c", "echo " + password + "|sudo docker image ls"};

        Process proc = Runtime.getRuntime().exec(cmd);
        int exc = proc.waitFor();
        System.out.println(exc);
        System.out.println("Here");

        String line;
        StringBuilder outputJSonStringBuilder = new StringBuilder();
        BufferedReader input = new BufferedReader(new InputStreamReader(proc.getInputStream()));
        while ((line = input.readLine()) != null) {
            outputJSonStringBuilder.append(line);
        }
        System.out.println("Here also");
        JsonObject jsonObject = JsonParser.parseString(outputJSonStringBuilder.toString()).getAsJsonObject();
        System.out.println(jsonObject.isJsonObject());
        assert jsonObject.isJsonObject();
        input.close();
        return outputJSonStringBuilder.toString();
    }

    public String filterJSONObject(String jsonReferenceString) {
        JsonObject jsonObject = JsonParser.parseString(jsonReferenceString).getAsJsonObject();
        JsonObject filteredObject = new JsonObject();
        filteredObject.addProperty("SchemaVersion", jsonObject.get("SchemaVersion").getAsString());
        filteredObject.addProperty("ArtifactName", jsonObject.get("ArtifactName").getAsString());
        filteredObject.addProperty("Results", jsonObject.get("Results").getAsString());

        return filteredObject.getAsString();
    }
}
