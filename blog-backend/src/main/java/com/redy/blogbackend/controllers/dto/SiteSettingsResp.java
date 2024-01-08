package com.redy.blogbackend.controllers.dto;

import com.redy.blogbackend.entities.SiteSettings;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SiteSettingsResp {
    private SiteSettings settings;
    private Boolean toOnBoard;
}
