package com.redy.blogbackend.controllers.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateUserDTO {
    @Size(min=3, message = "First name is too short")
    private String firstName;
    @Size(min=3, message = "Last name is too short")
    private String lastName;
    @Email(message = "Email must be valid")
    private String email;
    private String password;
    @Size(min=8, message = "Password should have min 8 chars")
    private String newPassword;
}
