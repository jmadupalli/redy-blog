package com.redy.blogbackend.controllers.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SettingsDTO {
    @NotBlank
    @Size(min=3)
    private String siteName;

    @NotBlank
    private String siteCaption;

    @Min(value = 1)
    private int pageSize;

    private Boolean showLogin;
}
