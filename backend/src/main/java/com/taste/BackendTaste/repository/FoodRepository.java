package com.taste.BackendTaste.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.taste.BackendTaste.entity.FoodEntity;


@Repository
public interface FoodRepository extends MongoRepository<FoodEntity, String> {
    List<FoodEntity> findBySellerEmail(String sellerEmail);
}
