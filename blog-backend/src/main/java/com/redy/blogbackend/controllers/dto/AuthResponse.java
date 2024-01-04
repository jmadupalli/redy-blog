package com.redy.blogbackend.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
public class AuthResponse {
    private String firstName;
    private String lastName;
    private String role;
    private Date expriesAt;
}
