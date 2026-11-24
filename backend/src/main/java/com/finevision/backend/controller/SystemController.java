package com.finevision.backend.controller;

import com.finevision.backend.BackendApplication;
import com.finevision.backend.constants.ApiConstants;
import com.finevision.backend.dto.response.ApiResponse;
import com.finevision.backend.dto.response.SystemInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstants.API_BASE_PATH + "/system")
public class SystemController {

    private final JdbcTemplate jdbcTemplate;

    @Value("${spring.application.name}")
    private String applicationName;

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, String>>> health() {

        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);

            log.debug("System health check successful");

            return ResponseEntity.ok(
                    ApiResponse.success(
                            "Application is running",
                            Map.of("status", "UP")
                    )
            );

        } catch (DataAccessException exception) {

            log.error(
                    "System health check failed: database unavailable",
                    exception
            );

            return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(
                            ApiResponse.failure(
                                    "Application is not ready"
                            )
                    );
        }
    }

    @GetMapping("/info")
    public ResponseEntity<ApiResponse<SystemInfoResponse>> info() {

        Package applicationPackage =
                BackendApplication.class.getPackage();

        String version = applicationPackage.getImplementationVersion();

        if (version == null || version.isBlank()) {
            version = "development";
        }

        SystemInfoResponse response = SystemInfoResponse.builder()
                .applicationName(applicationName)
                .applicationVersion(version)
                .javaVersion(System.getProperty("java.version"))
                .operatingSystem(System.getProperty("os.name"))
                .build();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Application information retrieved successfully",
                        response
                )
        );
    }
}