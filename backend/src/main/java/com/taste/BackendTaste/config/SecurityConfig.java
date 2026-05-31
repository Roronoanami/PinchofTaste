
// package com.taste.BackendTaste.config;

// import java.util.List;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// import com.taste.BackendTaste.filters.JwtAuthenticationFilter;

// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

// @Configuration
// public class SecurityConfig {

//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     // only inject jwtAuthenticationFilter (do NOT inject UserDetailsService here)
//     public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(AbstractHttpConfigurer::disable)
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//                 .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
//                 .requestMatchers("/api/food/**").permitAll()
//                 .requestMatchers("/api/cart/**").authenticated()
//                 .anyRequest().authenticated()
//             )
//             .sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     // Provide AuthenticationManager via AuthenticationConfiguration (Spring Boot recommended)
//     // @Bean
//     // public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//     //     return configuration.getAuthenticationManager();
//     // }

//     @Bean
//     public CorsFilter corsFilter() {
//         return new CorsFilter(corsConfigurationSource());
//     }

//     @Bean
//     public UrlBasedCorsConfigurationSource corsConfigurationSource() {

//         CorsConfiguration config = new CorsConfiguration();
//         config.setAllowCredentials(true);

//         config.setAllowedOrigins(List.of(
//                 "http://localhost:5173",
//                 "http://localhost:5174"
//         ));

//         config.setAllowedMethods(List.of(
//                 "GET", "POST", "PUT", "DELETE", "OPTIONS"
//         ));

//         config.setAllowedHeaders(List.of(
//                 "Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With"
//         ));

//         config.setExposedHeaders(List.of("Authorization"));

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", config);

//         return source;
//     }
// }


// package com.taste.BackendTaste.config;

// import java.util.List;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// import com.taste.BackendTaste.filters.JwtAuthenticationFilter;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

// @Configuration
// public class SecurityConfig {

//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(AbstractHttpConfigurer::disable)
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//                 .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
//                 .requestMatchers("/api/food/**").permitAll()
//                 .requestMatchers("/api/cart/**").authenticated()
//                  .requestMatchers("/api/user/address/**").authenticated()

//                 .requestMatchers("/api/order/**").authenticated()


//                 .anyRequest().authenticated()
//             )
//             .sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     // ⭐ IMPORTANT: THIS MUST EXIST (Only one AuthenticationManager in project)
//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//         return configuration.getAuthenticationManager();
//     }

//     @Bean
//     public CorsFilter corsFilter() {
//         return new CorsFilter(corsConfigurationSource());
//     }
// @Bean
// public UrlBasedCorsConfigurationSource corsConfigurationSource() {

//     CorsConfiguration config = new CorsConfiguration();

//     config.setAllowCredentials(true);

//     // ⭐ ALLOW ALL DURING DEVELOPMENT
//     config.addAllowedOriginPattern("*");


//     config.setAllowedMethods(List.of(
//             "GET", "POST", "PUT", "DELETE", "OPTIONS"
//     ));

//     config.setAllowedHeaders(List.of(
//             "Authorization",
//             "Content-Type",
//             "Accept",
//             "Origin",
//             "X-Requested-With"
//     ));

//     config.setExposedHeaders(List.of("Authorization"));

//     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//     source.registerCorsConfiguration("/**", config);

//     return source;
// }

// }



// package com.taste.BackendTaste.config;

// import java.util.List;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// import com.taste.BackendTaste.filters.JwtAuthenticationFilter;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

// @Configuration
// public class SecurityConfig {

//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(AbstractHttpConfigurer::disable)

//             // ⭐ FIX: Add CSP + allow Vite scripts, Cloudinary, inline/eval
//             .headers(headers -> headers
//                 .contentSecurityPolicy(csp -> csp
//                     .policyDirectives(
//                         "default-src 'self'; " +
//                         "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173; " +
//                         "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
//                         "img-src 'self' data: blob: https://res.cloudinary.com; " +
//                         "font-src 'self' https://fonts.gstatic.com; " +
//                         "connect-src 'self' http://localhost:5173 http://localhost:8080; " +
//                         "frame-ancestors 'self';"
//                     )
//                 )
//             )

//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//                 .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
//                 .requestMatchers("/api/food/**").permitAll()

//                 // protected customer routes
//                 .requestMatchers("/api/cart/**").authenticated()
//                 .requestMatchers("/api/user/address/**").authenticated()
//                 .requestMatchers("/api/order/**").authenticated()

//                 // ⭐ later we add seller routes:
//                 // .requestMatchers("/api/admin/**").hasRole("ADMIN")

//                 .anyRequest().authenticated()
//             )
//             .sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//         return configuration.getAuthenticationManager();
//     }

//     @Bean
//     public CorsFilter corsFilter() {
//         return new CorsFilter(corsConfigurationSource());
//     }

//     @Bean
//     public UrlBasedCorsConfigurationSource corsConfigurationSource() {

//         CorsConfiguration config = new CorsConfiguration();
//         config.setAllowCredentials(true);

//         // ⭐ ALLOW ALL DURING DEVELOPMENT
//         config.addAllowedOriginPattern("*");

//         config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

//         config.setAllowedHeaders(List.of(
//                 "Authorization",
//                 "Content-Type",
//                 "Accept",
//                 "Origin",
//                 "X-Requested-With"
//         ));

//         config.setExposedHeaders(List.of("Authorization"));

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", config);

//         return source;
//     }
// }



// package com.taste.BackendTaste.config;

// import java.util.List;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// import com.taste.BackendTaste.filters.JwtAuthenticationFilter;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

// // ⭐ ADD THESE IMPORTS
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// @Configuration
// public class SecurityConfig {

//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(AbstractHttpConfigurer::disable)

//             .headers(headers -> headers
//                 .contentSecurityPolicy(csp -> csp
//                     .policyDirectives(
//                         "default-src 'self'; " +
//                         "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173; " +
//                         "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
//                         "img-src 'self' data: blob: https://res.cloudinary.com; " +
//                         "font-src 'self' https://fonts.gstatic.com; " +
//                         "connect-src 'self' http://localhost:5173 http://localhost:8080; " +
//                         "frame-ancestors 'self';"
//                     )
//                 )
//             )

//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//                 .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
//                 .requestMatchers("/api/food/**").permitAll()

//                 .requestMatchers("/api/cart/**").authenticated()
//                 .requestMatchers("/api/user/address/**").authenticated()
//                 .requestMatchers("/api/order/**").authenticated()

//                 // ⭐ Seller endpoints will be added later
//                 // .requestMatchers("/api/admin/**").hasRole("SELLER")

//                 .anyRequest().authenticated()
//             )

//             .sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//         return configuration.getAuthenticationManager();
//     }

//     @Bean
//     public CorsFilter corsFilter() {
//         return new CorsFilter(corsConfigurationSource());
//     }

//     @Bean
//     public UrlBasedCorsConfigurationSource corsConfigurationSource() {

//         CorsConfiguration config = new CorsConfiguration();
//         config.setAllowCredentials(true);
//         config.addAllowedOriginPattern("*");
//         config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With"));
//         config.setExposedHeaders(List.of("Authorization"));

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", config);

//         return source;
//     }

  
// }



// package com.taste.BackendTaste.config;

// import java.util.List;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// import com.taste.BackendTaste.filters.JwtAuthenticationFilter;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

// @Configuration
// public class SecurityConfig {

//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(AbstractHttpConfigurer::disable)

//             // ⭐ ALLOW React + Cloudinary + inline scripts
//             .headers(headers -> headers
//                 .contentSecurityPolicy(csp -> csp
//                     .policyDirectives(
//                         "default-src 'self'; " +
//                         "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173; " +
//                         "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
//                         "img-src 'self' data: blob: https://res.cloudinary.com; " +
//                         "font-src 'self' https://fonts.gstatic.com; " +
//                         "connect-src 'self' http://localhost:8080 http://localhost:5173; " +
//                         "frame-ancestors 'self';"
//                     )
//                 )
//             )

//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

//                 // ⭐ PUBLIC ROUTES
//                 .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
//                 .requestMatchers("/api/seller/auth/**").permitAll()   // ⭐ REQUIRED FIX
//                 .requestMatchers("/api/food/**").permitAll()

//                 // ⭐ PROTECTED USER ROUTES
//                 .requestMatchers("/api/cart/**").authenticated()
//                 .requestMatchers("/api/user/address/**").authenticated()
//                 .requestMatchers("/api/order/**").authenticated()

//                 .anyRequest().authenticated()
//             )

//             .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }

//     @Bean
//     public CorsFilter corsFilter() {
//         return new CorsFilter(corsConfigurationSource());
//     }

//     @Bean
//     public UrlBasedCorsConfigurationSource corsConfigurationSource() {

//         CorsConfiguration config = new CorsConfiguration();
//         config.setAllowCredentials(true);
//         config.addAllowedOriginPattern("*");
//         config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With"));
//         config.setExposedHeaders(List.of("Authorization"));

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", config);

//         return source;
//     }
// }




















// package com.taste.BackendTaste.config;

// import java.util.List;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import org.springframework.web.filter.CorsFilter;

// import com.taste.BackendTaste.filters.JwtAuthenticationFilter;

// @Configuration
// public class SecurityConfig {

//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         http
//             .cors(c -> c.configurationSource(corsSource()))
//             .csrf(AbstractHttpConfigurer::disable)

//             .authorizeHttpRequests(auth -> auth

//                 // ⭐ ALLOW SELLER AUTH
//                 .requestMatchers("/api/seller/auth/**").permitAll()

//                 // ⭐ ALLOW CUSTOMER AUTH
//                 .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()

//                 // ⭐ PUBLIC ROUTES
//                 .requestMatchers("/api/food/**").permitAll()
//                 .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

//                 // ⭐ PROTECTED ROUTES
//                 .requestMatchers("/api/cart/**").authenticated()
//                 .requestMatchers("/api/user/address/**").authenticated()
//                 .requestMatchers("/api/order/**").authenticated()

//                 // ⭐ EVERYTHING ELSE REQUIRES AUTH
//                 .anyRequest().authenticated()
//             )

//             .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }

//     @Bean
//     public UrlBasedCorsConfigurationSource corsSource() {
//         CorsConfiguration cfg = new CorsConfiguration();
//         cfg.setAllowCredentials(true);
//         cfg.addAllowedOriginPattern("*");
//         cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         cfg.setAllowedHeaders(List.of("Authorization", "Content-Type"));
//         cfg.setExposedHeaders(List.of("Authorization"));

//         UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
//         src.registerCorsConfiguration("/**", cfg);
//         return src;
//     }

//     @Bean
//     public CorsFilter corsFilter() {
//         return new CorsFilter(corsSource());
//     }
// }



// package com.taste.BackendTaste.config;

// import java.util.List;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import org.springframework.web.filter.CorsFilter;

// import com.taste.BackendTaste.filters.JwtAuthenticationFilter;

// @Configuration
// public class SecurityConfig {

//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         http
//             .cors(c -> c.configurationSource(corsSource()))
//             .csrf(AbstractHttpConfigurer::disable)

//             .authorizeHttpRequests(auth -> auth

//                 // ⭐ SELLER AUTH ROUTES PERMITTED
//                 .requestMatchers("/api/seller/auth/login", "/api/seller/auth/register").permitAll()

//                 // ⭐ USER AUTH ROUTES PERMITTED
//                 .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()

//                 // ⭐ PUBLIC ROUTES
//                 .requestMatchers("/api/food/**").permitAll()
//                 .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

//                 // ⭐ USER PROTECTED
//                 .requestMatchers("/api/cart/**").authenticated()
//                 .requestMatchers("/api/user/address/**").authenticated()
//                 .requestMatchers("/api/order/**").authenticated()

//                 // ⭐ SELLER PROTECTED
//                 .requestMatchers("/api/seller/**").hasRole("SELLER")

//                 .anyRequest().authenticated()
//             )

//             .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }

//     @Bean
//     public UrlBasedCorsConfigurationSource corsSource() {
//         CorsConfiguration cfg = new CorsConfiguration();
//         cfg.setAllowCredentials(true);
//         cfg.addAllowedOriginPattern("*");
//         cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         cfg.setAllowedHeaders(List.of("Authorization", "Content-Type"));
//         cfg.setExposedHeaders(List.of("Authorization"));

//         UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
//         src.registerCorsConfiguration("/**", cfg);
//         return src;
//     }

//     @Bean
//     public CorsFilter corsFilter() {
//         return new CorsFilter(corsSource());
//     }
// }




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
