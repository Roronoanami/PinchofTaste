// package com.taste.BackendTaste.controller;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.web.bind.annotation.*;

// import com.taste.BackendTaste.io.AuthenticationRequest;
// import com.taste.BackendTaste.io.AuthenticationResponse;
// import com.taste.BackendTaste.service.AppUserDetailsService;
// import com.taste.BackendTaste.util.JwtUtil;

// import lombok.RequiredArgsConstructor;

// @RestController
// @RequestMapping("/api/auth")
// @RequiredArgsConstructor
// public class AuthController {

//     private final AuthenticationManager authenticationManager;
//     private final AppUserDetailsService userDetailsService;
//     private final JwtUtil jwtUtil;

//     // ===================== REGISTER =====================
//     @PostMapping("/register")
//     public String register(@RequestBody AuthenticationRequest request) {

//         if (userDetailsService.existsByEmail(request.getEmail())) {
//             return "Email already exists";
//         }

//         userDetailsService.saveUser(request.getName(), request.getEmail(), request.getPassword());
//         return "User registered successfully";
//     }

//     // ===================== LOGIN =====================
//     @PostMapping("/login")
//     public AuthenticationResponse login(@RequestBody AuthenticationRequest request) {

//         try {
//             authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(
//                     request.getEmail(),
//                     request.getPassword()
//                 )
//             );
//         } catch (BadCredentialsException e) {
//             throw new RuntimeException("Invalid email or password");
//         }

//         UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
//         String jwtToken = jwtUtil.generateToken(userDetails);

//         return new AuthenticationResponse(request.getEmail(), jwtToken);
//     }
// }



package com.taste.BackendTaste.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.taste.BackendTaste.io.AuthenticationRequest;
import com.taste.BackendTaste.io.AuthenticationResponse;
import com.taste.BackendTaste.service.AppUserDetailsService;
import com.taste.BackendTaste.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    // ===================== REGISTER =====================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthenticationRequest request) {

        if (userDetailsService.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(409)
                    .body(Map.of("message", "Email already exists"));
        }

        userDetailsService.saveUser(request.getName(), request.getEmail(), request.getPassword());
        return ResponseEntity.status(201)
                .body(Map.of("message", "User registered successfully"));
    }

    // ===================== LOGIN =====================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {

        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Authentication failed"));
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String jwtToken = jwtUtil.generateToken(userDetails);

        AuthenticationResponse resp = new AuthenticationResponse(request.getEmail(), jwtToken);
        return ResponseEntity.ok(resp);
    }
}
