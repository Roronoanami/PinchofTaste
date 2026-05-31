package com.taste.BackendTaste.service;

import com.taste.BackendTaste.entity.AddressEntity;

public interface AddressService {

    AddressEntity saveAddress(String userId, AddressEntity data);

    AddressEntity getAddress(String userId);
}
