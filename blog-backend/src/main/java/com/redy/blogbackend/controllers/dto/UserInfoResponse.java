package com.redy.blogbackend.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
}
