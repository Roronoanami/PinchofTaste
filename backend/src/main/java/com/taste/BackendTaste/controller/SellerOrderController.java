package com.taste.BackendTaste.controller;

import java.util.List;



import com.taste.BackendTaste.dto.StatusUpdateRequest;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taste.BackendTaste.entity.OrderEntity;
import com.taste.BackendTaste.repository.OrderRepository;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/seller/orders")
@RequiredArgsConstructor
public class SellerOrderController {

    private final OrderRepository orderRepository;

    @GetMapping
    public List<OrderEntity> getSellerOrders(Authentication auth) {
        return orderRepository
                .findBySellerEmailOrderByCreatedAtDesc(auth.getName());
    }

    @PatchMapping("/{orderId}/status")
    public OrderEntity updateOrderStatus(
            @PathVariable String orderId,
            @RequestBody StatusUpdateRequest request,
            Authentication auth
    ) {
        OrderEntity order = orderRepository
                .findByIdAndSellerEmail(orderId, auth.getName())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(request.getStatus());

        if (request.getPrepTime() != null) {
            order.setPrepTime(request.getPrepTime());
            order.setReadyAt(
                    LocalDateTime.now().plusMinutes(request.getPrepTime())
            );
        }

        return orderRepository.save(order);
    }
}
