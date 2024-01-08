package com.redy.blogbackend.controllers.dto;

import com.redy.blogbackend.entities.SiteSettings;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class OnBoardDTO {

    @NotBlank
    @Size(min=3)
    private String siteName;

    @NotBlank
    private String siteCaption;

    private boolean showLogin;

    private RegisterDTO userDTO;
}
