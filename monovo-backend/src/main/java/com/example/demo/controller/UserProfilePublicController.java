package com.example.demo.controller;

import com.example.demo.dto.ProfilePublicView;
import com.example.demo.service.UserProfilePublicService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/profile")
public class UserProfilePublicController {
  private final UserProfilePublicService service;
  public UserProfilePublicController(UserProfilePublicService service) { this.service = service; }

  @GetMapping("/me/public")
  public ProfilePublicView me(@RequestHeader("X-User-Id") UUID userId) {
    return service.getPublic(userId);
  }
}
