package com.taste.BackendTaste.io;

import java.util.Map;
import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CartResponse{

    
    private String id;
    private String userId;
    private Map<String, Integer> items = new HashMap<>();
}
