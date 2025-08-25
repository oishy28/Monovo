package com.example.demo.service;

import com.example.demo.dto.UserProfileUpsertRequest;
import com.example.demo.entity.UserProfile;
import com.example.demo.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UserProfileService {
  private final UserProfileRepository repo;

  public UserProfileService(UserProfileRepository repo) { this.repo = repo; }

  @Transactional
  public void upsert(UUID userId, UserProfileUpsertRequest r) {
    var p = repo.findByUserId(userId).orElseGet(UserProfile::new);
    p.setUserId(userId);
    p.setAgeRange(r.ageRange());
    p.setGender(r.gender());
    p.setTimezone(r.timezone());
    p.setMainReasons(r.mainReasons());
    p.setSkills(r.skills());
    p.setTopEmotions(r.topEmotions());
    p.setMoodWeek(r.moodWeek());
    p.setWantReminders(r.wantReminders());
    p.setNotifyType(r.notifyType());
    p.setOneThing(r.oneThing());
    repo.save(p);
  }
}
