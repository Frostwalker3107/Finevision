package com.finevision.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponse {

    private boolean success;

    private String message;

    private String path;

    private LocalDateTime timestamp;

    private Map<String, String> validationErrors;
}