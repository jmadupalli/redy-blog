package com.redy.blogbackend.services;

import com.redy.blogbackend.config.auth.Role;
import com.redy.blogbackend.controllers.dto.*;
import com.redy.blogbackend.entities.SiteSettings;
import com.redy.blogbackend.entities.User;
import com.redy.blogbackend.entities.projections.ListUser;
import com.redy.blogbackend.repositories.SiteSettingsRepository;
import com.redy.blogbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final SiteSettingsRepository siteSettingsRepository;
    private final PasswordEncoder passwordEncoder;

    public UserInfoResponse getSelfInfo() throws Exception {
        User user = getUserFromContext();
        return new UserInfoResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail());
    }

    public UserInfoResponse getUserById(int userId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
        return new UserInfoResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail());
    }

    public List<ListUser> listUsers() {
        return userRepository.listUsers();
    }

    public void registerUser(RegisterDTO registerDTO, boolean isAdmin) throws Exception{
        Optional<User> userExists = userRepository.findByEmail(registerDTO.getEmail());
        if(userExists.isPresent()){
            throw new Exception("Provided email already exists");
        }
        String userRole = isAdmin? Role.ROLE_ADMIN.name() : Role.ROLE_USER.name();
        User user = User
                .builder()
                .firstName(registerDTO.getFirstName())
                .lastName(registerDTO.getLastName())
                .email(registerDTO.getEmail())
                .role(userRole)
                .password(passwordEncoder.encode(registerDTO.getPassword()))
                .build();

        userRepository.save(user);

    }

    public void updateUser(UpdateUserDTO userDTO, int userId) throws Exception {
        User InvokingUser = getUserFromContext();
        User user = InvokingUser;
        if(user.getId() != userId && ! user.getRole().equals(Role.ROLE_ADMIN.name()))
            throw new AccessDeniedException("Invalid Operation");

        if(user.getId() != userId){
            user = userRepository.findById(userId)
                    .orElseThrow(() -> new Exception("User Not Found"));
        }

        if(userDTO.getEmail() != null && !userDTO.getEmail().equalsIgnoreCase(user.getEmail())){
            Optional<User> userExists = userRepository.findByEmail(userDTO.getEmail());
            if(userExists.isPresent()){
                throw new Exception("Provided email already exists");
            }

            user.setEmail(userDTO.getEmail());
        }

        if(userDTO.getFirstName() != null)
            user.setFirstName(userDTO.getFirstName());
        if(userDTO.getLastName() != null)
            user.setLastName(userDTO.getLastName());

        if(userDTO.getPassword() != null && userDTO.getNewPassword() != null){
            if(!passwordEncoder.matches(userDTO.getPassword(), user.getPassword()))
                throw new Exception("Value submitted for current password is incorrect");

            user.setPassword(passwordEncoder.encode(userDTO.getNewPassword()));
        }

        if(userDTO.getNewPassword() != null && InvokingUser.getRole().equals(Role.ROLE_ADMIN.name())){
            user.setPassword(passwordEncoder.encode(userDTO.getNewPassword()));
        }

        userRepository.save(user);

    }

    public void deleteUser(int userId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
        if(user.getRole().equals(Role.ROLE_ADMIN.name()))
            throw new Exception("Cannot delete an admin account");
        userRepository.deleteById(userId);
    }

    public void makeAdmin(int userId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));

        user.setRole(Role.ROLE_ADMIN.name());
        userRepository.save(user);
    }

    public void removeAdmin(int userId) throws Exception {
        User loggedInUser = getUserFromContext();
        if(userId == loggedInUser.getId())
            throw new Exception("Cannot remove yourself as an admin");

        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));

        user.setRole(Role.ROLE_USER.name());
        userRepository.save(user);
    }

    public SiteSettingsResp getSettings() {
        Optional<SiteSettings> siteSettings = siteSettingsRepository.findById(1);
        SiteSettingsResp response = new SiteSettingsResp(null, true);
        if(siteSettings.isPresent()){
            response.setSettings(siteSettings.get());
            response.setToOnBoard(false);
        }
        return response;
    }

    public void onBoardSite(OnBoardDTO onBoardDTO) throws Exception{
        Optional<SiteSettings> siteSettings = siteSettingsRepository.findById(1);
        if(siteSettings.isPresent())
            throw new AccessDeniedException("Invalid Operation");

        registerUser(onBoardDTO.getUserDTO(), true);
        SiteSettings newSettings = SiteSettings.builder().siteCaption(onBoardDTO.getSiteCaption()).siteName(onBoardDTO.getSiteName()).build();
        siteSettingsRepository.save(newSettings);
    }

    public void updateSiteSettings(SettingsDTO settingsDTO) throws Exception {
        SiteSettings settings = siteSettingsRepository.findById(1).orElseThrow(() -> new Exception("Invalid Operation"));

        settings.setSiteCaption(settingsDTO.getSiteCaption());
        settings.setSiteName(settingsDTO.getSiteName());
        settings.setShowLogin(settingsDTO.getShowLogin());
        settings.setPageSize(settingsDTO.getPageSize());

        siteSettingsRepository.save(settings);
    }

    private User getUserFromContext() throws Exception {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username)
                .orElseThrow( () -> new Exception("User not logged in!"));
    }

}
