



package com.taste.BackendTaste.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.security.config.Customizer;

import com.taste.BackendTaste.filters.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .cors(Customizer.withDefaults())

            .csrf(AbstractHttpConfigurer::disable)

            .authorizeHttpRequests(auth -> auth

                // ⭐ SELLER AUTH ROUTES (PUBLIC)
                .requestMatchers("/api/seller/auth/**").permitAll()

                // ⭐ USER AUTH ROUTES (PUBLIC)
                .requestMatchers("/api/auth/**").permitAll()

                // ⭐ PUBLIC ROUTES
                .requestMatchers("/api/food/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ⭐ USER PROTECTED ROUTES
                .requestMatchers("/api/cart/**").authenticated()
                .requestMatchers("/api/user/address/**").authenticated()
                .requestMatchers("/api/order/**").authenticated()

                                // SELLER PUBLIC
                          .requestMatchers("/api/seller/auth/**").permitAll()

                          // SELLER PROTECTED
                        .requestMatchers("/api/seller/food/**").hasRole("SELLER")
                        .requestMatchers("/api/seller/orders/**").hasRole("SELLER")



                // ⭐ ANYTHING ELSE → authenticated
                .anyRequest().authenticated()
            )

            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
