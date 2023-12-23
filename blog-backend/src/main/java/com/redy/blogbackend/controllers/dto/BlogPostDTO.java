package com.redy.blogbackend.controllers.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BlogPostDTO {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String keywords;

    @NotBlank
    private String content;
}
