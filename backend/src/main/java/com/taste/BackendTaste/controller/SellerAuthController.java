// package com.taste.BackendTaste.controller;

// import com.taste.BackendTaste.dto.AuthResponse;
// import com.taste.BackendTaste.dto.LoginDTO;
// import com.taste.BackendTaste.models.Seller;
// import com.taste.BackendTaste.repository.SellerRepository;
// import com.taste.BackendTaste.service.JwtService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/seller/auth")
// @CrossOrigin
// public class SellerAuthController {

//     @Autowired
//     private SellerRepository sellerRepository;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     @Autowired
//     private JwtService jwtService;

//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {

//         Seller seller = sellerRepository.findByEmail(loginDTO.getEmail())
//                 .orElseThrow(() -> new RuntimeException("Seller not found"));

//         if (!passwordEncoder.matches(loginDTO.getPassword(), seller.getPassword())) {
//             throw new RuntimeException("Invalid password");
//         }

//         String token = jwtService.generateToken(seller.getEmail(), seller.getRole());

//         return ResponseEntity.ok(new AuthResponse(token));
//     }
// }




// package com.taste.BackendTaste.controller;

// import com.taste.BackendTaste.dto.AuthResponse;
// import com.taste.BackendTaste.dto.LoginDTO;
// import com.taste.BackendTaste.models.Seller;
// import com.taste.BackendTaste.repository.SellerRepository;
// import com.taste.BackendTaste.service.JwtService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/seller/auth")
// @CrossOrigin
// public class SellerAuthController {

//     @Autowired
//     private SellerRepository sellerRepository;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     @Autowired
//     private JwtService jwtService;

//     // ===============================
//     // ⭐ SELLER REGISTRATION
//     // ===============================
//     @PostMapping("/register")
//     public ResponseEntity<?> register(@RequestBody Seller seller) {

//         if (sellerRepository.findByEmail(seller.getEmail()).isPresent()) {
//             return ResponseEntity.badRequest().body("Email already exists");
//         }

//         seller.setPassword(passwordEncoder.encode(seller.getPassword()));
//         seller.setRole("SELLER");

//         sellerRepository.save(seller);

//         return ResponseEntity.ok("Seller registered successfully");
//     }

//     // ===============================
//     // ⭐ SELLER LOGIN
//     // ===============================
//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {

//         Seller seller = sellerRepository.findByEmail(loginDTO.getEmail())
//                 .orElseThrow(() -> new RuntimeException("Seller not found"));

//         if (!passwordEncoder.matches(loginDTO.getPassword(), seller.getPassword())) {
//             return ResponseEntity.status(401).body("Invalid password");
//         }

//         String token = jwtService.generateToken(seller.getEmail(), seller.getRole());

//         return ResponseEntity.ok(
//                 new AuthResponse(
//                         seller.getEmail(),
//                         seller.getRole(),
//                         token
//                 )
//         );
//     }
// }


package com.taste.BackendTaste.controller;

import com.taste.BackendTaste.dto.AuthResponse;
import com.taste.BackendTaste.dto.LoginDTO;
import com.taste.BackendTaste.models.Seller;
import com.taste.BackendTaste.repository.SellerRepository;
import com.taste.BackendTaste.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller/auth")
@CrossOrigin
public class SellerAuthController {

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;   // ⭐ Use SAME JwtUtil as customer

    // ===============================
    // ⭐ SELLER REGISTRATION
    // ===============================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Seller seller) {

        if (sellerRepository.findByEmail(seller.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        seller.setPassword(passwordEncoder.encode(seller.getPassword()));
        seller.setRole("SELLER");

        sellerRepository.save(seller);

        return ResponseEntity.ok("Seller registered successfully");
    }

    // ===============================
    // ⭐ SELLER LOGIN
    // ===============================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {

        Seller seller = sellerRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        if (!passwordEncoder.matches(loginDTO.getPassword(), seller.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        // ⭐ Generate proper seller token using JwtUtil
        String token = jwtUtil.generateToken(seller.getEmail(), seller.getRole());

        return ResponseEntity.ok(
                new AuthResponse(
                        seller.getEmail(),
                        seller.getRole(),
                        token
                )
        );
    }
}
