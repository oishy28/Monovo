package com.example.demo.service;

import com.example.demo.dto.ProfilePublicView;
import com.example.demo.entity.UserProfile;
import com.example.demo.repository.UserProfileRepository;
import com.example.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserProfilePublicService {
    private final UserRepository users;
    private final UserProfileRepository profiles;

    public UserProfilePublicService(UserRepository users, UserProfileRepository profiles) {
        this.users = users;
        this.profiles = profiles;
    }

    public ProfilePublicView getPublic(UUID userId) {
        var user = users.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        UserProfile p = profiles.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found"));
        return new ProfilePublicView(
                user.getName(),
                p.getAgeRange(),
                p.getGender(),
                p.getSkills(),
                p.getTimezone()   // using timezone as "location"
        );
    }
}
