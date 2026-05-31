package com.taste.BackendTaste.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.taste.BackendTaste.entity.AddressEntity;

public interface AddressRepository extends MongoRepository<AddressEntity, String> {

    Optional<AddressEntity> findByUserId(String userId);
}
