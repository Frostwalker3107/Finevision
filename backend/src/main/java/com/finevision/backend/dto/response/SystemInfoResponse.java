package com.finevision.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SystemInfoResponse {

    private String applicationName;

    private String applicationVersion;

    private String javaVersion;

    private String operatingSystem;
}