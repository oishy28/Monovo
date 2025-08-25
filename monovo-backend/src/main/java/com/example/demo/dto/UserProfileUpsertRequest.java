package com.example.demo.dto;

import java.util.List;

public record UserProfileUpsertRequest(
  String ageRange, String gender, String timezone,
  List<String> mainReasons, List<String> skills, List<String> topEmotions,
  Integer moodWeek, String wantReminders, String notifyType, String oneThing
) {}
