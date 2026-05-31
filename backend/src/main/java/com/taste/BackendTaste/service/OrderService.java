
// package com.taste.BackendTaste.service;

// import java.util.List;

// import com.taste.BackendTaste.entity.OrderEntity;

// public interface OrderService {

//     List<OrderEntity> getOrdersByUser(String email);

//     void saveOrder(OrderEntity order);

//     String getUserIdByEmail(String email);
// }



package com.taste.BackendTaste.service;

import com.taste.BackendTaste.entity.OrderEntity;
import java.util.List;

public interface OrderService {

    OrderEntity placeOrder(String userId, OrderEntity order);

    List<OrderEntity> getOrdersByUser(String email);
}
