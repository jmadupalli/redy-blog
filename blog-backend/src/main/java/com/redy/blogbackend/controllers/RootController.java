package com.redy.blogbackend.controllers;

import com.redy.blogbackend.controllers.dto.OnBoardDTO;
import com.redy.blogbackend.controllers.dto.SiteSettingsResp;
import com.redy.blogbackend.services.RootService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RootController {
    private final RootService rootService;

    @GetMapping(value = "/")
    public Map<String, String> sayHello() {
        return Map.of("message", "Hello, I'm built to persist and serve your blogs! :)");
    }

    @GetMapping("/settings")
    public SiteSettingsResp getSettings() {
        return rootService.getSettings();
    }

    @PostMapping("/onboard")
    public void onBoardSite(@Valid @RequestBody OnBoardDTO onBoardDTO) throws Exception {
        rootService.onBoardSite(onBoardDTO);
    }


}
