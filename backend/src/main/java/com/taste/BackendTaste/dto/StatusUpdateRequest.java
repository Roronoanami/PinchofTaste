package com.taste.BackendTaste.dto;

import lombok.Data;

@Data
public class StatusUpdateRequest {
    private String status;
    private Integer prepTime; // minutes
}
