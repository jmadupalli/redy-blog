package com.redy.blogbackend.services;

import com.redy.blogbackend.controllers.dto.AuthResponse;
import com.redy.blogbackend.controllers.dto.LoginDTO;
import com.redy.blogbackend.entities.User;
import com.redy.blogbackend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse loginUser(LoginDTO loginDTO, HttpServletResponse response) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(
                () -> new UsernameNotFoundException("User not found")
        );
        ResponseCookie cookie = jwtService.generateTokenCookie(user.getUsername());
        Date expiresAt = new Date(System.currentTimeMillis() + cookie.getMaxAge().toMillis());
        ResponseCookie userRoleCookie = ResponseCookie
                .from("userRole", user.getRole())
                .path("/")
                .httpOnly(true)
                .secure(false)
                .maxAge(cookie.getMaxAge())
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, userRoleCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return AuthResponse
                .builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .expriesAt(expiresAt)
                .build();
    }

}