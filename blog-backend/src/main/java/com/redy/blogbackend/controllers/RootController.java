package com.redy.blogbackend.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class RootController {
    @GetMapping(value = "/")
    @PreAuthorize("hasRole('ROLE_USER')")
    public Map<String, String> sayHello() {
        return Map.of("message", "Hello, I'm built to persist and serve your blogs! :)");
    }
}
