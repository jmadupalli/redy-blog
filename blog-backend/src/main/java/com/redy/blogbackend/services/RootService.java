package com.redy.blogbackend.services;

import com.redy.blogbackend.controllers.dto.OnBoardDTO;
import com.redy.blogbackend.controllers.dto.SiteSettingsResp;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RootService {
    private final UserService userService;

    public SiteSettingsResp getSettings() {
        return userService.getSettings();
    }

    public void onBoardSite(OnBoardDTO onBoardDTO) throws Exception{
        userService.onBoardSite(onBoardDTO);
    }
}
