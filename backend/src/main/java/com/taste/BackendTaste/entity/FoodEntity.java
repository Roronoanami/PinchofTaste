// package com.taste.BackendTaste.entity;

// import java.util.List; // ⭐ REQUIRED import

// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// import lombok.Data;
// import lombok.AllArgsConstructor;
// import lombok.NoArgsConstructor;
// import lombok.Builder;

// @Data
// @Builder
// @AllArgsConstructor
// @NoArgsConstructor
// @Document(collection = "food")
// public class FoodEntity {

//     @Id
//     private String id;

//     private String name;

//     private String description;

//     private String category;

//     private double price;

//     private double offerPrice;

//     private List<String> image;   // MUST be List<String> because frontend uses image[0]

//     private String sellerEmail;   // identifies which seller added product
// }



package com.taste.BackendTaste.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "food")
public class FoodEntity {

    @Id
    private String id;

    private String name;
    private String description;
    private String category;

    private double price;
    private double offerPrice;

    private List<String> image;   // for seller panel (image[0])
    private String sellerEmail;   // who created this item
}
