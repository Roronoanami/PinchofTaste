// package com.taste.BackendTaste.util;

// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Component;

// import java.security.Key;
// import java.util.Date;
// import java.util.Map;
// import java.util.HashMap;

// @Component
// public class JwtUtil {

//     @Value("${jwt.secret}")
//     private String SECRET_KEY;

//     @Value("${jwt.expiration}")
//     private long EXPIRATION;

//     private Key getSignKey() {
//         return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
//     }

//     public String generateToken(UserDetails userDetails) {
//         Map<String, Object> claims = new HashMap<>();
//         return createToken(claims, userDetails.getUsername());
//     }

//     private String createToken(Map<String, Object> claims, String subject) {
//         return Jwts.builder()
//                 .setClaims(claims)
//                 .setSubject(subject)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
//                 .signWith(getSignKey(), SignatureAlgorithm.HS256)
//                 .compact();
//     }
// }

 

// package com.taste.BackendTaste.util;

// import io.jsonwebtoken.*;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Component;

// import java.security.Key;
// import java.util.Date;
// import java.util.Map;
// import java.util.HashMap;

// @Component
// public class JwtUtil {

//     @Value("${jwt.secret}")
//     private String SECRET_KEY;

//     @Value("${jwt.expiration}")
//     private long EXPIRATION;

//     private Key getSignKey() {
//         return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
//     }

//     // ---------------------------------------------------------
//     // GENERATE TOKEN
//     // ---------------------------------------------------------
//     public String generateToken(UserDetails userDetails) {
//         return createToken(new HashMap<>(), userDetails.getUsername());
//     }

//     private String createToken(Map<String, Object> claims, String subject) {
//         return Jwts.builder()
//                 .setClaims(claims)
//                 .setSubject(subject)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
//                 .signWith(getSignKey(), SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     // ---------------------------------------------------------
//     // EXTRACT USERNAME
//     // ---------------------------------------------------------
//     public String extractUsername(String token) {
//         return extractAllClaims(token).getSubject();
//     }

//     // ---------------------------------------------------------
//     // EXTRACT ALL CLAIMS
//     // ---------------------------------------------------------
//     private Claims extractAllClaims(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(getSignKey())
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//     }

//     // ---------------------------------------------------------
//     // VALIDATE TOKEN
//     // ---------------------------------------------------------
//     public boolean validateToken(String token, UserDetails userDetails) {
//         try {
//             String username = extractUsername(token);
//             Date expiration = extractAllClaims(token).getExpiration();
//             return (username.equals(userDetails.getUsername()) && expiration.after(new Date()));
//         } catch (JwtException e) {
//             return false;
//         }
//     }
// }



// package com.taste.BackendTaste.util;

// import io.jsonwebtoken.*;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Component;

// import java.security.Key;
// import java.util.Date;
// import java.util.HashMap;
// import java.util.Map;

// @Component
// public class JwtUtil {

//     @Value("${jwt.secret}")
//     private String SECRET_KEY;

//     @Value("${jwt.expiration}")
//     private long EXPIRATION;

//     private Key getSignKey() {
//         return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
//     }

//     // Generate JWT
//     public String generateToken(UserDetails userDetails) {
//         return Jwts.builder()
//                 .setClaims(new HashMap<>())
//                 .setSubject(userDetails.getUsername())
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
//                 .signWith(getSignKey(), SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     // Extract email
//     public String extractUsername(String token) {
//         return extractAllClaims(token).getSubject();
//     }

//     // Extract claims
//     private Claims extractAllClaims(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(getSignKey())
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//     }

//     // Validate JWT
//     public boolean validateToken(String token, UserDetails userDetails) {
//         try {
//             String username = extractUsername(token);
//             return username.equals(userDetails.getUsername())
//                     && extractAllClaims(token).getExpiration().after(new Date());
//         } catch (Exception e) {
//             return false;
//         }
//     }
// }


package com.taste.BackendTaste.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration}")
    private long EXPIRATION;

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // ============================================
    // 🔥 GENERATE TOKEN FOR CUSTOMER (UserDetails)
    // ============================================
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "USER");   // USER role for normal customers

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())   // email
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ============================================
    // 🔥 GENERATE TOKEN FOR SELLER (email + role)
    // ============================================
    public String generateToken(String email, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);  // SELLER or ADMIN

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ============================================
    // 🔍 EXTRACT EMAIL (subject)
    // ============================================
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // ============================================
    // 🔍 EXTRACT ROLE
    // ============================================
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    // ============================================
    // 🔍 CLAIM PARSER
    // ============================================
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ============================================
    // 🔒 VALIDATE TOKEN FOR CUSTOMER
    // ============================================
    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            String username = extractUsername(token);
            return username.equals(userDetails.getUsername())
                    && extractAllClaims(token).getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    // ============================================
    // 🔒 VALIDATE TOKEN FOR SELLER
    // ============================================
    public boolean validateToken(String token) {
        try {
            return extractAllClaims(token).getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
