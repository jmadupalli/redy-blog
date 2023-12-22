package com.redy.blogbackend.controllers;

import com.redy.blogbackend.controllers.dto.AuthResponse;
import com.redy.blogbackend.controllers.dto.LoginDTO;
import com.redy.blogbackend.controllers.dto.RegisterDTO;
import com.redy.blogbackend.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerUser(@Valid @RequestBody RegisterDTO registerDTO) throws Exception {
        authService.registerUser(registerDTO);
    }

    @PostMapping("/login")
    public AuthResponse loginUser(@Valid @RequestBody LoginDTO loginDTO, HttpServletResponse response) throws Exception {
        return authService.loginUser(loginDTO, response);
    }
}
