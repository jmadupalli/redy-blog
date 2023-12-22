package com.redy.blogbackend.controllers.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterDTO {

    @Size(min=3, message = "First name is too short")
    @NotBlank(message = "First name is required")
    private String firstName;
    @Size(min=3, message = "Last name is too short")
    @NotBlank(message = "Last name is required")
    private String lastName;
    @Email(message = "Email must be valid")
    @NotBlank(message = "Email is required")
    private String email;
    @Size(min=8, message = "Password should have min 8 chars")
    @NotBlank(message = "Password should have min 8 chars")
    private String password;
}
