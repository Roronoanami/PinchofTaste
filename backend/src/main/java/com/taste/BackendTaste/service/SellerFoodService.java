


package com.taste.BackendTaste.service;

import com.taste.BackendTaste.entity.FoodEntity;
import com.taste.BackendTaste.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerFoodService {

    private final FoodRepository foodRepository;
    private final CloudinaryService cloudinaryService;

    // ADD FOOD
    public FoodEntity addFood(
            String sellerEmail,
            String name,
            String description,
            String category,
            double price,
            double offerPrice,
            MultipartFile image
    ) {
        String imageUrl = cloudinaryService.uploadFile(image);

        FoodEntity food = new FoodEntity();
        food.setName(name);
        food.setDescription(description);
        food.setCategory(category);
        food.setPrice(price);
        food.setOfferPrice(offerPrice);
        food.setSellerEmail(sellerEmail);

        // store as list so frontend can use image[0]
        food.setImage(Collections.singletonList(imageUrl));

        return foodRepository.save(food);
    }

    // GET ALL PRODUCTS OF THIS SELLER
    public List<FoodEntity> getSellerFoods(String sellerEmail) {
        return foodRepository.findBySellerEmail(sellerEmail);
    }

    // DELETE FOOD
    public boolean deleteFood(String foodId, String sellerEmail) {
    FoodEntity food = foodRepository.findById(foodId).orElse(null);

    if (food == null) return false;
    if (!food.getSellerEmail().equals(sellerEmail)) return false;

    foodRepository.deleteById(foodId);
    return true;
}

}
