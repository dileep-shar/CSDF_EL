package com.example.csdf_el;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

public class Temp {
    static String password="King@123";
    public static String fetchJSONObjectThroughCommandForImageId(String imageId) throws IOException, InterruptedException {
        String fileName= "results/"+LocalDateTime.now().toString()+".json";
//        String[] rm_cmd = {"/bin/bash", "-c", "rm results/"+imageId+".json "};
//        Process proc = Runtime.getRuntime().exec(rm_cmd);
//        proc.waitFor();
        String trivy_cmd="trivy image --security-checks vuln --format json "+ "-o "+fileName+" "+ imageId ;
        String[] cmd = {"/bin/bash", "-c",trivy_cmd };
        System.out.println(trivy_cmd);
        Process proc = Runtime.getRuntime().exec(cmd);
        int exc = proc.waitFor();
//        System.out.println(exc);
        Path path= Paths.get(fileName);
        String jsonString= Files.readString(path);
        jsonString="{\n\"data\":"+jsonString+"\n}";
        JsonObject jsonObject = JsonParser.parseString(jsonString).getAsJsonObject();
        System.out.println(jsonObject.isJsonObject());
        assert jsonObject.isJsonObject();
        return jsonString;
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        fetchJSONObjectThroughCommandForImageId("alpine");
//        System.out.println(LocalDateTime.now());
    }
}
