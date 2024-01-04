package com.redy.blogbackend.controllers;

import com.redy.blogbackend.controllers.dto.RegisterDTO;
import com.redy.blogbackend.controllers.dto.UpdateUserDTO;
import com.redy.blogbackend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@Valid @RequestBody RegisterDTO registerDTO) throws Exception {
        userService.registerUser(registerDTO);
    }

    @PatchMapping("/{id}")
    public void updateUser(@Valid @RequestBody UpdateUserDTO updateDTO, @PathVariable("id") int userId) throws Exception {
        userService.updateUser(updateDTO, userId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") int userId) throws Exception {
        userService.deleteUser(userId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/makeAdmin/{id}")
    public void makeAdmin(@PathVariable("id") int userId) throws Exception{
        userService.makeAdmin(userId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/removeAdmin/{id}")
    public void removeAdmin(@PathVariable("id") int userId) throws Exception{
        userService.removeAdmin(userId);
    }

}
