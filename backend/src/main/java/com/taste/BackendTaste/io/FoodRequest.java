// package com.taste.BackendTaste.io;


// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @Builder
// public class FoodRequest {


//      private String name;
//      private String description;
//      private double price;
//      private String category;
     
// }


// package com.taste.BackendTaste.io;

// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @Builder
// public class FoodRequest {
//    private String name;
// private String description;
// private String category;
// private double price;
// private double offerPrice;   // ⭐ add this

// }


package com.taste.BackendTaste.io;

import lombok.Data;

@Data
public class FoodRequest {

    private String name;
    private String description;
    private String category;

    private double price;
    private double offerPrice;   // ⭐ ADD THIS
}
