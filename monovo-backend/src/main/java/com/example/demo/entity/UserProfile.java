package com.example.demo.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UuidGenerator;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    @Column(name = "age_range")
    private String ageRange;

    private String gender;
    private String timezone;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb", name = "main_reasons")
    private List<String> mainReasons;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private List<String> skills;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb", name = "top_emotions")
    private List<String> topEmotions;

    @Column(name = "mood_week")
    private Integer moodWeek;

    @Column(name = "want_reminders")
    private String wantReminders;

    @Column(name = "notify_type")
    private String notifyType;

    @Column(name = "one_thing")
    private String oneThing;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private OffsetDateTime updatedAt;

    // getters/setters
    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public String getAgeRange() { return ageRange; }
    public void setAgeRange(String ageRange) { this.ageRange = ageRange; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }
    public List<String> getMainReasons() { return mainReasons; }
    public void setMainReasons(List<String> mainReasons) { this.mainReasons = mainReasons; }
    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
    public List<String> getTopEmotions() { return topEmotions; }
    public void setTopEmotions(List<String> topEmotions) { this.topEmotions = topEmotions; }
    public Integer getMoodWeek() { return moodWeek; }
    public void setMoodWeek(Integer moodWeek) { this.moodWeek = moodWeek; }
    public String getWantReminders() { return wantReminders; }
    public void setWantReminders(String wantReminders) { this.wantReminders = wantReminders; }
    public String getNotifyType() { return notifyType; }
    public void setNotifyType(String notifyType) { this.notifyType = notifyType; }
    public String getOneThing() { return oneThing; }
    public void setOneThing(String oneThing) { this.oneThing = oneThing; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }
}
