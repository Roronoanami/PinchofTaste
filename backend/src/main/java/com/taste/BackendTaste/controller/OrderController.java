

package com.taste.BackendTaste.controller;

import com.taste.BackendTaste.entity.OrderEntity;
import com.taste.BackendTaste.service.OrderService;
import com.taste.BackendTaste.service.CartService;
import com.taste.BackendTaste.service.AppUserDetailsService;
import com.taste.BackendTaste.util.JwtUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final CartService cartService;
    private final AppUserDetailsService userService;
    private final JwtUtil jwtUtil;

    // ⭐ PLACE ORDER
    @PostMapping("/place")
    public String placeOrder(
            @RequestHeader("Authorization") String tokenHeader,
            @RequestBody OrderEntity request
    ) {

        String token = tokenHeader.replace("Bearer ", "");
        String userEmail = jwtUtil.extractUsername(token);
        String userId = userService.getUserIdByEmail(userEmail);

        // Save order
        orderService.placeOrder(userId, request);

        // ⭐ CLEAR CART AFTER ORDER (NO ARGUMENT)
        cartService.clearCart();

        return "Order placed successfully";
    }

    // ⭐ GET MY ORDERS
    @GetMapping("/my-orders")
    public List<OrderEntity> getMyOrders(@RequestHeader("Authorization") String tokenHeader) {

        String token = tokenHeader.replace("Bearer ", "");
        String userEmail = jwtUtil.extractUsername(token);

        return orderService.getOrdersByUser(userEmail);
    }
}


