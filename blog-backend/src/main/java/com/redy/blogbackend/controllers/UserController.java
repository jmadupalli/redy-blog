package com.redy.blogbackend.controllers;

import com.redy.blogbackend.controllers.dto.*;
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

public class UserController {

    private final UserService userService;

    @PatchMapping("/{id}")
    public void updateUser(@Valid @RequestBody UpdateUserDTO updateDTO, @PathVariable("id") int userId) throws Exception {
        userService.updateUser(updateDTO, userId);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/")
    public UserInfoResponse getUser() throws Exception{
        return userService.getSelfInfo();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/{id}")
    public UserInfoResponse getUserById(@PathVariable("id") int userId) throws Exception{
        return userService.getUserById(userId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/admin/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@Valid @RequestBody RegisterDTO registerDTO) throws Exception {
        userService.registerUser(registerDTO, false);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/list")
    public List<ListUser> listUsers() throws Exception {
        return userService.listUsers();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/admin/{id}")
    public void deleteUser(@PathVariable("id") int userId) throws Exception {
        userService.deleteUser(userId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/admin/makeAdmin/{id}")
    public void makeAdmin(@PathVariable("id") int userId) throws Exception{
        userService.makeAdmin(userId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/admin/removeAdmin/{id}")
    public void removeAdmin(@PathVariable("id") int userId) throws Exception{
        userService.removeAdmin(userId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/admin/siteSettings")
    public void updateSettings(@Valid @RequestBody SettingsDTO settingsDTO) throws Exception {
        userService.updateSiteSettings(settingsDTO);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/siteSettings")
    public SiteSettingsResp getSettings() {
        return userService.getSettings();
    }

}
