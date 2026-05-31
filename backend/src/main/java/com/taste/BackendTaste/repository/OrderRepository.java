


// package com.taste.BackendTaste.repository;

// import com.taste.BackendTaste.entity.OrderEntity;
// import org.springframework.data.mongodb.repository.MongoRepository;

// import java.util.List;

// public interface OrderRepository extends MongoRepository<OrderEntity, String> {

//     List<OrderEntity> findByUserIdOrderByCreatedAtDesc(String userId);
// }


// package com.taste.BackendTaste.repository;

// import java.util.List;

// import org.springframework.data.mongodb.repository.MongoRepository;

// import com.taste.BackendTaste.entity.OrderEntity;

// public interface OrderRepository extends MongoRepository<OrderEntity, String> {
//     List<OrderEntity> findByUserIdOrderByCreatedAtDesc(String userId);
// }






package com.taste.BackendTaste.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.taste.BackendTaste.entity.OrderEntity;
import java.util.Optional;
@Repository
public interface OrderRepository extends MongoRepository<OrderEntity, String> {

// 👤 All orders of a customer (userId stored in order)
List<OrderEntity> findByUserIdOrderByCreatedAtDesc(String userId);

// 🧑‍🍳 All orders belonging to a seller
List<OrderEntity> findBySellerEmailOrderByCreatedAtDesc(String sellerEmail);
Optional<OrderEntity> findByIdAndSellerEmail(String id, String sellerEmail);

}

