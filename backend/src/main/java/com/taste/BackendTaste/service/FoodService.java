

package com.taste.BackendTaste.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

import com.taste.BackendTaste.io.FoodRequest;
import com.taste.BackendTaste.io.FoodResponse;

public interface FoodService {

    String uploadFile(MultipartFile file);

    FoodResponse addFood(FoodRequest request, MultipartFile file);

    List<FoodResponse> readFoods();

    FoodResponse readFood(String id);

    void deleteFood(String id);
}
