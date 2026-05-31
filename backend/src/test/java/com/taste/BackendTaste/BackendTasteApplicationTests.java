package com.taste.BackendTaste;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") // This makes Spring load application-test.properties
class BackendTasteApplicationTests {

    @Test
    void contextLoads() {
        // Will use pinchfood_test DB
        // MinIO disabled (no bean loaded)
    }
}
