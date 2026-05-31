





package com.taste.BackendTaste.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.taste.BackendTaste.entity.FoodEntity;
import com.taste.BackendTaste.io.FoodRequest;
import com.taste.BackendTaste.io.FoodResponse;
import com.taste.BackendTaste.repository.FoodRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FoodServiceImp implements FoodService {

private final Cloudinary cloudinary;
private final FoodRepository foodRepository;

public FoodServiceImp(Cloudinary cloudinary, FoodRepository foodRepository) {
    this.cloudinary = cloudinary;
    this.foodRepository = foodRepository;
}

@Override
public String uploadFile(MultipartFile file) {

    String contentType = file.getContentType();
    if (contentType == null || !contentType.startsWith("image/")) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only image files are allowed");
    }

    try {
        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", "food_images",
                        "public_id", UUID.randomUUID().toString()
                )
        );

        return uploadResult.get("secure_url").toString();

    } catch (IOException e) {
        throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Cloudinary upload failed: " + e.getMessage(), e
        );
    }
}

@Override
public FoodResponse addFood(FoodRequest request, MultipartFile file) {
    try {
        FoodEntity newFoodEntity = convertToEntity(request);
        String imageUrl = uploadFile(file);

        // ⭐ FIX: FoodEntity uses List<String> image
        newFoodEntity.setImage(List.of(imageUrl));

        newFoodEntity = foodRepository.save(newFoodEntity);
        return convertToResponse(newFoodEntity);

    } catch (Exception e) {
        throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Failed to add food: " + e.getMessage(), e
        );
    }
}

@Override
public FoodResponse readFood(String id) {
    FoodEntity existingFood = foodRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Food not found for id: " + id));
    return convertToResponse(existingFood);
}

@Override
public List<FoodResponse> readFoods() {
    return foodRepository.findAll()
            .stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
}

@Override
public void deleteFood(String id) {
    foodRepository.deleteById(id);
}

private FoodEntity convertToEntity(FoodRequest request) {

    if (request.getCategory() == null || request.getCategory().isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category is required");
    }

    String category = request.getCategory()
            .trim()
            .toLowerCase()
            .replace("-", " ");

    switch (category) {
        case "burger", "burgers" -> category = "Burgers";
        case "pizza" -> category = "Pizza";
        case "drink", "drinks" -> category = "Drinks";
        case "dessert", "desserts" -> category = "Dessert";
        case "diet food", "diet", "health" -> category = "Diet Food";
        case "pasta" -> category = "Pasta";

        default -> throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Invalid category! Allowed categories: Burgers, Pizza, Drinks, Dessert, Diet Food, Pasta"
        );
    }

    return FoodEntity.builder()
            .name(request.getName())
            .description(request.getDescription())
            .category(category)
            .price(request.getPrice())
            .offerPrice(request.getOfferPrice())
            .build();
}

private FoodResponse convertToResponse(FoodEntity entity) {

    String imageUrl = null;

    if (entity.getImage() != null && !entity.getImage().isEmpty()) {
        imageUrl = entity.getImage().get(0); // ⭐ first image
    }

    return FoodResponse.builder()
            .id(entity.getId())
            .name(entity.getName())
            .description(entity.getDescription())
            .category(entity.getCategory())
            .price(entity.getPrice())
            .offerPrice(entity.getOfferPrice())
            .imageUrl(imageUrl)
            .build();
}


}