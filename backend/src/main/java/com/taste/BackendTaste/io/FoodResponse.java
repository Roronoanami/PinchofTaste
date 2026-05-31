// package com.taste.BackendTaste.io;

// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @Builder
// public class FoodResponse {
//     private String id;
//     private String name;
//     private String description;
//     private double price;
//     private String category;
//     private String imageUrl;
    
// }


package com.taste.BackendTaste.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodResponse {
    private String id;
    private String name;
    private String description;  // fixed typo here
    private double price;
    private String category;
    private double offerPrice;

    private String imageUrl;
}
