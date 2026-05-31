// package com.taste.BackendTaste.service;

// import java.util.Collections;

// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.taste.BackendTaste.entity.UserEntity;
// import com.taste.BackendTaste.repository.UserRepository;

// import lombok.AllArgsConstructor;

// @AllArgsConstructor
// @Service
// public class AppUserDetailsService implements UserDetailsService {

//     private final UserRepository userRepository;

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         UserEntity user = userRepository.findByEmail(username)
//                 .orElseThrow(() -> new UsernameNotFoundException("User not found"));

//         return new User(
//                 user.getEmail(),
//                 user.getPassword(),
//                 Collections.emptyList()
//         );
//     }
// }



// package com.taste.BackendTaste.service;

// import java.util.Collections;

// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.taste.BackendTaste.entity.UserEntity;
// import com.taste.BackendTaste.repository.UserRepository;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class AppUserDetailsService implements UserDetailsService {

//     private final UserRepository userRepository;
//     private final PasswordEncoder passwordEncoder;

//     @Override
//     public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//         UserEntity user = userRepository.findByEmail(email)
//             .orElseThrow(() -> new UsernameNotFoundException("User not found"));

//         return User.withUsername(user.getEmail())
//                 .password(user.getPassword())
//                 .authorities(Collections.emptyList())
//                 .build();
//     }

//     // NEW: Check if email exists
//     public boolean existsByEmail(String email) {
//         return userRepository.findByEmail(email).isPresent();
//     }

//     // NEW: Save new user
//     public void saveUser(String name, String email, String rawPassword) {
//         UserEntity user = new UserEntity();
//         user.setName(name);
//         user.setEmail(email);
//         user.setPassword(passwordEncoder.encode(rawPassword));

//         userRepository.save(user);
//     }
// }


package com.taste.BackendTaste.service;

import java.util.Collections;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.taste.BackendTaste.entity.UserEntity;
import com.taste.BackendTaste.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return User.withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(Collections.emptyList())
                .build();
    }

    // Check if email already exists
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    // Save/register new user
    public void saveUser(String name, String email, String rawPassword) {
        UserEntity user = new UserEntity();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword));
        userRepository.save(user);
    }

    // ⭐ NEW: Get userId from email (required for My Orders)
    public String getUserIdByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getId();
    }
}
