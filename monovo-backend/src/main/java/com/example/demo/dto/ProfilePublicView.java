package com.example.demo.dto;

import java.util.List;

public record ProfilePublicView(
  String name, String ageRange, String gender, List<String> skills, String location
) {}
