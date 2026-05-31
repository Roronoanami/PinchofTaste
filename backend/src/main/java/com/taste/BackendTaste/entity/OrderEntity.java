


// package com.taste.BackendTaste.entity;

// import java.time.LocalDateTime;
// import java.util.List;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// import lombok.Data;

// @Data
// @Document(collection = "orders")
// public class OrderEntity {

//     @Id
//     private String id;

//     private String userId;
//     private List<Item> items;

//     private Address address;

//     private String payment;
//     private String status;

//     private LocalDateTime createdAt;

//                @Data
// public static class Item {

//     private String foodId;
//     private int qty;

//     private String name;
//     private String category;
//     private String imageUrl;

//     private double price;
//     private double offerPrice;
// }

//     @Data
//     public static class Address {
//         private String firstName;
//         private String lastName;
//         private String phono;
//         private String email;
//         private String place;
//     }
// }






package com.taste.BackendTaste.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "orders")
public class OrderEntity {

@Id
private String id;

// 👤 Customer email or ID
private String userId;

// 🧑‍🍳 SELLER EMAIL → REQUIRED for seller dashboard
private String sellerEmail;

private List<Item> items;

private Address address;

private String payment;

// ⏱️ Preparation time (minutes)
private Integer prepTime;

// ⏰ When order will be ready
private LocalDateTime readyAt;


// 🚚 Default status
private String status = "PLACED"; // change default from PENDING → PLACED



// 🕒 Auto timestamp
private LocalDateTime createdAt = LocalDateTime.now();

// 💰 Optional but useful
private double totalAmount;

@Data
public static class Item {

    private String foodId;
    private int qty;

    private String name;
    private String category;
    private String imageUrl;

    private double price;
    private double offerPrice;
}

@Data
public static class Address {
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String seat;
}


}