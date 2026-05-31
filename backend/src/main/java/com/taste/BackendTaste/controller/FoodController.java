



package com.taste.BackendTaste.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.taste.BackendTaste.io.FoodRequest;
import com.taste.BackendTaste.io.FoodResponse;
import com.taste.BackendTaste.service.FoodService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/food")
@AllArgsConstructor
public class FoodController {

    private final FoodService foodService;

    // ⭐ ADD FOOD (JSON + IMAGE)
    @PostMapping
    public FoodResponse addFood(
            @RequestPart("food") String foodString,
            @RequestPart("image") MultipartFile file) {

        System.out.println("Received food JSON: " + foodString);
        System.out.println("Received image file: " + file.getOriginalFilename());

        // Convert JSON → FoodRequest object
        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest request;
        try {
            request = objectMapper.readValue(foodString, FoodRequest.class);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON format", e);
        }

        // Call service
        return foodService.addFood(request, file);
    }

    // ⭐ GET ALL FOODS
    @GetMapping
    public List<FoodResponse> readFoods() {
        return foodService.readFoods();
    }

    // ⭐ GET FOOD BY ID
    @GetMapping("/{id}")
    public FoodResponse readFood(@PathVariable String id) {
        return foodService.readFood(id);
    }

    // ⭐ DELETE FOOD BY ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFood(@PathVariable String id) {
        foodService.deleteFood(id);
    }
}
