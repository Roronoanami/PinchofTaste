package com.taste.BackendTaste.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.taste.BackendTaste.entity.AddressEntity;
import com.taste.BackendTaste.repository.AddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    @Override
    public AddressEntity saveAddress(String userId, AddressEntity data) {

        Optional<AddressEntity> existing = addressRepository.findByUserId(userId);

        AddressEntity addr = existing.orElse(new AddressEntity());

        addr.setUserId(userId);
        addr.setFirstName(data.getFirstName());
        addr.setLastName(data.getLastName());
        addr.setPhone(data.getPhone());
        addr.setSeat(data.getSeat());
        addr.setEmail(data.getEmail());

        return addressRepository.save(addr);
    }

    @Override
    public AddressEntity getAddress(String userId) {
        return addressRepository.findByUserId(userId).orElse(null);
    }
}
