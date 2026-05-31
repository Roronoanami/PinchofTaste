// package com.taste.BackendTaste.controller;

// import com.taste.BackendTaste.entity.FoodEntity;
// import com.taste.BackendTaste.service.SellerFoodService;
// import com.taste.BackendTaste.util.JwtUtil;

// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import java.util.List;

// @RestController
// @RequestMapping("/api/seller/food")
// @RequiredArgsConstructor
// public class SellerFoodController {

//     private final SellerFoodService sellerFoodService;
//     private final JwtUtil jwtUtil;

//     // ADD PRODUCT
//     @PostMapping
//     public ResponseEntity<?> addFood(
//             @RequestParam String name,
//             @RequestParam String description,
//             @RequestParam String category,
//             @RequestParam double price,
//             @RequestParam double offerPrice,
//             @RequestParam MultipartFile image,
//             @RequestHeader("Authorization") String authHeader
//     ) {
//         String token = authHeader.substring(7);
//         String email = jwtUtil.extractUsername(token);

//         FoodEntity food = sellerFoodService.addFood(
//                 email, name, description, category, price, offerPrice, image
//         );

//         return ResponseEntity.ok(food);
//     }

//     // GET SELLER PRODUCTS
//     @GetMapping
//     public ResponseEntity<List<FoodEntity>> getSellerFoods(
//             @RequestHeader("Authorization") String authHeader
//     ) {
//         String token = authHeader.substring(7);
//         String email = jwtUtil.extractUsername(token);

//         return ResponseEntity.ok(sellerFoodService.getSellerFoods(email));
//     }

//     // DELETE FOOD
//     @DeleteMapping("/{id}")
//     public ResponseEntity<?> deleteFood(@PathVariable String id) {
//         sellerFoodService.deleteFood(id);
//         return ResponseEntity.ok("Deleted");
//     }
// }



// package com.taste.BackendTaste.controller;

// import com.taste.BackendTaste.entity.FoodEntity;
// import com.taste.BackendTaste.service.SellerFoodService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import java.util.List;

// @RestController
// @RequestMapping("/api/seller/food")
// @RequiredArgsConstructor
// @CrossOrigin // optional, but safe
// public class SellerFoodController {

//     private final SellerFoodService sellerFoodService;

//     // ⭐ ADD PRODUCT
//     @PostMapping("/add")
//     public FoodEntity addFood(
//             Authentication authentication,            // comes from JWT
//             @RequestParam("name") String name,
//             @RequestParam("description") String description,
//             @RequestParam("category") String category,
//             @RequestParam("price") double price,
//             @RequestParam("offerPrice") double offerPrice,
//             @RequestParam("image") MultipartFile image
//     ) {
//         // email was set as principal in JwtAuthenticationFilter
//         String sellerEmail = authentication.getName();
//         return sellerFoodService.addFood(
//                 sellerEmail,
//                 name,
//                 description,
//                 category,
//                 price,
//                 offerPrice,
//                 image
//         );
//     }

//     // ⭐ GET ALL PRODUCTS FOR LOGGED-IN SELLER
//     @GetMapping("/my-products")
//     public List<FoodEntity> getMyFoods(Authentication authentication) {
//         String sellerEmail = authentication.getName();
//         return sellerFoodService.getSellerFoods(sellerEmail);
//     }

//     // ⭐ DELETE PRODUCT
//     @DeleteMapping("/{id}")
//     public void deleteFood(@PathVariable String id, Authentication authentication) {
//         // (Optional) you can check that this food belongs to this seller
//         sellerFoodService.deleteFood(id);
//     }
// }





package com.taste.BackendTaste.controller;

import com.taste.BackendTaste.entity.FoodEntity;
import com.taste.BackendTaste.service.SellerFoodService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/seller/food")
@RequiredArgsConstructor
@CrossOrigin
public class SellerFoodController {

    private final SellerFoodService sellerFoodService;

    // ⭐ ADD PRODUCT
    @PostMapping("/add")
    public ResponseEntity<?> addFood(
            Authentication authentication,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("price") double price,
            @RequestParam("offerPrice") double offerPrice,
            @RequestParam("image") MultipartFile image
    ) {

        String sellerEmail = authentication.getName(); // from JWT

        FoodEntity savedFood = sellerFoodService.addFood(
                sellerEmail,
                name,
                description,
                category,
                price,
                offerPrice,
                image
        );

        return ResponseEntity.ok(savedFood);
    }

    // ⭐ GET ALL PRODUCTS FOR THIS SELLER
    @GetMapping("/my-products")
    public ResponseEntity<List<FoodEntity>> getMyFoods(Authentication authentication) {
        String sellerEmail = authentication.getName();
        return ResponseEntity.ok(sellerFoodService.getSellerFoods(sellerEmail));
    }

    // ⭐ DELETE PRODUCT
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFood(
            @PathVariable String id,
            Authentication authentication
    ) {
        String sellerEmail = authentication.getName();

        boolean deleted = sellerFoodService.deleteFood(id, sellerEmail);

        if (!deleted) {
            return ResponseEntity.status(403).body("You cannot delete this product.");
        }

        return ResponseEntity.ok("Product deleted successfully");
    }
}
