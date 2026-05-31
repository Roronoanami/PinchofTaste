


package com.taste.BackendTaste.service;

import com.taste.BackendTaste.entity.FoodEntity;
import com.taste.BackendTaste.entity.OrderEntity;
import com.taste.BackendTaste.repository.FoodRepository;
import com.taste.BackendTaste.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

private final OrderRepository orderRepository;
private final FoodRepository foodRepository;
private final AppUserDetailsService userService;

@Override
public OrderEntity placeOrder(String userId, OrderEntity order) {

    order.setUserId(userId);
    order.setCreatedAt(LocalDateTime.now());
    order.setStatus("PENDING");

    String sellerEmail = null;
    double totalAmount = 0;

    // ⭐ Process order items
    if (order.getItems() != null) {
        for (OrderEntity.Item item : order.getItems()) {

            if (item == null || item.getFoodId() == null) continue;

            FoodEntity food = foodRepository.findById(item.getFoodId()).orElse(null);

            if (food != null) {

                // capture seller email
                if (sellerEmail == null) {
                    sellerEmail = food.getSellerEmail();
                }

                // copy food details
                item.setName(food.getName());
                item.setCategory(food.getCategory());

                if (food.getImage() != null && !food.getImage().isEmpty()) {
                    item.setImageUrl(food.getImage().get(0));
                }

                item.setPrice(food.getPrice());
                item.setOfferPrice(food.getOfferPrice());

                // calculate total
                totalAmount += (item.getOfferPrice() > 0 ? item.getOfferPrice() : item.getPrice()) * item.getQty();
            }
        }
    }

    // ⭐ Save extra fields
    order.setSellerEmail(sellerEmail);
    order.setTotalAmount(totalAmount);

    return orderRepository.save(order);
}

@Override
public List<OrderEntity> getOrdersByUser(String email) {
    String userId = userService.getUserIdByEmail(email);
    return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
}


}