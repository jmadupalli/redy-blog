package com.redy.blogbackend.controllers;

import com.redy.blogbackend.controllers.dto.RegisterDTO;
import com.redy.blogbackend.controllers.dto.UpdateUserDTO;
import com.redy.blogbackend.controllers.dto.UserInfoResponse;
import com.redy.blogbackend.entities.User;
import com.redy.blogbackend.entities.projections.ListUser;
import com.redy.blogbackend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class UserController {

    private final UserService userService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/")
    public UserInfoResponse getUser() throws Exception{
        return userService.getSelfInfo();
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@Valid @RequestBody RegisterDTO registerDTO) throws Exception {
        userService.registerUser(registerDTO);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/list")
    public List<ListUser> listUsers() {
       return userService.listUsers();
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
