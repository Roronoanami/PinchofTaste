// package com.taste.BackendTaste.service;

// import com.cloudinary.Cloudinary;
// import com.cloudinary.utils.ObjectUtils;
// import lombok.RequiredArgsConstructor;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.IOException;
// import java.util.Map;

// @Service
// @RequiredArgsConstructor
// public class CloudinaryService {

//     @Value("${cloudinary.cloud_name}")
//     private String cloudName;

//     @Value("${cloudinary.api_key}")
//     private String apiKey;

//     @Value("${cloudinary.api_secret}")
//     private String apiSecret;

//     public String uploadFile(MultipartFile file) {
//         Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
//                 "cloud_name", cloudName,
//                 "api_key", apiKey,
//                 "api_secret", apiSecret
//         ));

//         try {
//             Map uploadResult = cloudinary.uploader().upload(
//                     file.getBytes(),
//                     ObjectUtils.emptyMap()
//             );

//             return uploadResult.get("secure_url").toString();

//         } catch (IOException e) {
//             throw new RuntimeException("Image upload failed", e);
//         }
//     }
// }



package com.taste.BackendTaste.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) {
        try {
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "food_images"
                    )
            );

            return (String) uploadResult.get("secure_url");

        } catch (IOException e) {
            throw new RuntimeException("❌ Failed to upload image to Cloudinary", e);
        }
    }
}
