package com.taste.BackendTaste.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taste.BackendTaste.entity.AddressEntity;
import com.taste.BackendTaste.service.AddressService;
import com.taste.BackendTaste.service.UserService; // your existing service that reads JWT user

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AddressController {

    private final AddressService addressService;
    private final UserService userService;

    @PostMapping("/address")
    public ResponseEntity<?> saveAddress(@RequestBody AddressEntity address) {

        String userId = userService.getCurrentUserId(); // extract from JWT

        AddressEntity saved = addressService.saveAddress(userId, address);

        return ResponseEntity.ok(saved);
    }

    @GetMapping("/address")
    public ResponseEntity<?> getAddress() {

        String userId = userService.getCurrentUserId();

        AddressEntity addr = addressService.getAddress(userId);

        return ResponseEntity.ok(addr);
    }
}
