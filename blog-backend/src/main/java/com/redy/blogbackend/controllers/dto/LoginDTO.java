package com.redy.blogbackend.controllers.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginDTO {
    @Email(message = "Invalid username")
    private String email;
    @NotBlank(message = "Invalid password")
    private String password;
}
