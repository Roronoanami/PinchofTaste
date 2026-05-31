
package com.taste.BackendTaste.service;



import com.taste.BackendTaste.io.CartRequest;
import com.taste.BackendTaste.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
    

}
