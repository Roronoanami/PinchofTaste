// package com.taste.BackendTaste.controller;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.HttpStatusCode;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.server.ResponseStatusException;

// import com.taste.BackendTaste.io.CartRequest;
// import com.taste.BackendTaste.io.CartResponse;
// import com.taste.BackendTaste.service.CartService;

// import lombok.AllArgsConstructor;

// @RestController
// @RequestMapping("/api/cart")
// @AllArgsConstructor
// public class CartController {

//     private final CartService cartService;

//     @PostMapping
//     public CartResponse addToCart(@RequestBody CartRequest request,
//                                   Authentication authentication) {

//         if (request.getFoodId() == null || request.getFoodId().isEmpty()) {
//             throw new ResponseStatusException(
//                     HttpStatus.BAD_REQUEST,
//                     "foodId is required"
//             );
//         }

//         return cartService.addToCart(request);
//     }

//     @GetMapping
//     public CartResponse getCart() {
//         return cartService.getCart();
//     }

//     @DeleteMapping
//     @ResponseStatus(HttpStatus.NO_CONTENT)
//     public void clearCart() {
//         cartService.clearCart();
//     }

//     public CartResponse removeFromCart( @RequestBody Cart) {
//          String foodId = request.getFoodId();
//          if(foodId == null || foodId.isEmpty()) {
//             throw new ResponseStatusException(HttpStatusCode)

//          }
//            return cartService.removeFromCart(request);

//     }
// }


package com.taste.BackendTaste.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.taste.BackendTaste.io.CartRequest;
import com.taste.BackendTaste.io.CartResponse;
import com.taste.BackendTaste.service.CartService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public CartResponse addToCart(@RequestBody CartRequest request,
                                  Authentication authentication) {

        if (request.getFoodId() == null || request.getFoodId().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "foodId is required");
        }

        return cartService.addToCart(request);
    }

    @GetMapping
    public CartResponse getCart() {
        return cartService.getCart();
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearCart() {
        cartService.clearCart();
    }

    // 🚀 REMOVE ITEM FROM CART (THE MISSING PART)
    @DeleteMapping("/remove")
    public CartResponse removeFromCart(@RequestBody CartRequest request) {

        if (request.getFoodId() == null || request.getFoodId().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "foodId is required");
        }

        return cartService.removeFromCart(request);
    }
}
