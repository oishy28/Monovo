package com.example.demo.controller;

import com.example.demo.dto.UserProfileUpsertRequest;
import com.example.demo.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {
  private final UserProfileService service;
  public UserProfileController(UserProfileService service) { this.service = service; }

  @PutMapping
  public ResponseEntity<Void> upsert(@RequestHeader("X-User-Id") UUID userId,
                                     @RequestBody UserProfileUpsertRequest req) {
    service.upsert(userId, req);
    return ResponseEntity.noContent().build();
  }
}
