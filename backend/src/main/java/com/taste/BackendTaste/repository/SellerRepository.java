package com.taste.BackendTaste.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.taste.BackendTaste.models.Seller;

public interface SellerRepository extends MongoRepository<Seller, String> {
    Optional<Seller> findByEmail(String email);
}
