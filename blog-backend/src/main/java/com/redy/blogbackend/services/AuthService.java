package com.redy.blogbackend.services;

import com.redy.blogbackend.config.auth.Role;
import com.redy.blogbackend.controllers.dto.AuthResponse;
import com.redy.blogbackend.controllers.dto.LoginDTO;
import com.redy.blogbackend.controllers.dto.RegisterDTO;
import com.redy.blogbackend.entities.User;
import com.redy.blogbackend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void registerUser(RegisterDTO registerDTO) throws Exception{
        Optional<User> userExists = userRepository.findByEmail(registerDTO.getEmail());
        if(userExists.isPresent()){
            throw new Exception("Provided email already exists");
        }

        User user = User
                .builder()
                .firstName(registerDTO.getFirstName())
                .lastName(registerDTO.getLastName())
                .email(registerDTO.getEmail())
                .role(Role.ROLE_USER)
                .password(passwordEncoder.encode(registerDTO.getPassword()))
                .build();

        userRepository.save(user);

    }

    public AuthResponse loginUser(LoginDTO loginDTO, HttpServletResponse response) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(
                () -> new UsernameNotFoundException("User not found")
        );
        ResponseCookie cookie = jwtService.generateTokenCookie(user.getUsername());
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return AuthResponse
                .builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }

}