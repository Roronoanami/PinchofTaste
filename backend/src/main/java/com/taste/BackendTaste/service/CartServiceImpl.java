// 



package com.taste.BackendTaste.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.taste.BackendTaste.entity.CartEntity;
import com.taste.BackendTaste.io.CartRequest;
import com.taste.BackendTaste.io.CartResponse;
import com.taste.BackendTaste.repository.CartRepository;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final UserService userService;

    @Override
    public CartResponse addToCart(CartRequest request) {

        String loggedInUserId = userService.getCurrentUserId();

        Optional<CartEntity> cartOptional = cartRepository.findByUserId(loggedInUserId);

        CartEntity cart = cartOptional.orElseGet(
                () -> new CartEntity(loggedInUserId, new HashMap<>())
        );

        Map<String, Integer> cartItems = cart.getItems();
        if (cartItems == null) {
            cartItems = new HashMap<>();
        }

        cartItems.put(
                request.getFoodId(),
                cartItems.getOrDefault(request.getFoodId(), 0) + 1
        );

        cart.setItems(cartItems);

        cart = cartRepository.save(cart);

        return convertToResponse(cart);
    }

    @Override
    public CartResponse getCart() {

        String loggedInUserId = userService.getCurrentUserId();

        CartEntity entity = cartRepository.findByUserId(loggedInUserId)
                .orElse(new CartEntity(loggedInUserId, new HashMap<>()));

        if (entity.getItems() == null) {
            entity.setItems(new HashMap<>());
        }

        return convertToResponse(entity);
    }

    @Override
    public void clearCart() {
        String loggedInUserId = userService.getCurrentUserId();
        cartRepository.deleteByUserId(loggedInUserId);
    }

    @Override
    public CartResponse removeFromCart(CartRequest cartRequest) {

        String loggedInUserId = userService.getCurrentUserId();

        CartEntity entity = cartRepository.findByUserId(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Cart is not found"));

        Map<String, Integer> cartItems = entity.getItems();

        if (cartItems.containsKey(cartRequest.getFoodId())) {

            int currentQty = cartItems.get(cartRequest.getFoodId());

            if (currentQty > 1) {
                cartItems.put(cartRequest.getFoodId(), currentQty - 1);
            } else {
                cartItems.remove(cartRequest.getFoodId());
            }

            entity.setItems(cartItems);
            entity = cartRepository.save(entity);
        }

        return convertToResponse(entity);
    }

    private CartResponse convertToResponse(CartEntity cartEntity) {
        return CartResponse.builder()
                .id(cartEntity.getId())
                .userId(cartEntity.getUserId())
                .items(cartEntity.getItems())
                .build();
    }
}
