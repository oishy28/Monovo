import React, { useMemo, useState } from "react";
import Stepper, { Step } from "../../interactive/Stepper";
import { AGE_RANGES, GENDERS, REASONS, SKILLS, EMOTIONS, MOOD_EMOJI } from "../../constants";

function Chip({ label, selected, onClick, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border transition ${selected ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-800 border-gray-300 hover:border-blue-500"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {label}
    </button>
  );
}

function SectionHeader({ title, optional }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {optional && (
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">Optional</span>
      )}
    </div>
  );
}

export default function OnboardingQuiz({ onComplete }) {
  const defaultTz = useMemo(
    () => (Intl?.DateTimeFormat ? Intl.DateTimeFormat().resolvedOptions().timeZone : ""),
    []
  );

  const [data, setData] = useState({
    timezone: defaultTz,
    mainReasons: [],
    skills: [],
    topEmotions: [],
  });

  const finish = () => {
    onComplete?.(data);
    alert("Thanks! Your preferences were saved. You can adjust them anytime in Settings.");
  };

  const toggleInArray = (key, value, limit) => {
    setData((prev) => {
      const arr = new Set(prev[key] || []);
      if (arr.has(value)) arr.delete(value);
      else if (!limit || arr.size < limit) arr.add(value);
      return { ...prev, [key]: Array.from(arr) };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-[1200px] h-[600px] flex flex-col">

        <h1 className="text-2xl font-bold tracking-tight mb-1">Welcome to Monovo ✨</h1>
        <p className="text-gray-600 mb-4">Let’s tailor your experience. This takes under a minute—and most questions are optional.</p>

        <div className="flex-1 min-h-0">
          <Stepper initialStep={1} onFinalStepCompleted={finish} backButtonText="Back" nextButtonText="Next">
            <Step>
              <div className="space-y-6">

                <SectionHeader title="Tell us a bit about you" optional />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age range <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {AGE_RANGES.map((a) => (
                        <Chip
                          key={a}
                          label={a}
                          selected={data.ageRange === a}
                          onClick={() => setData((d) => ({ ...d, ageRange: d.ageRange === a ? undefined : a }))}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {GENDERS.map((g) => (
                        <Chip
                          key={g}
                          label={g}
                          selected={data.gender === g}
                          onClick={() => setData((d) => ({ ...d, gender: d.gender === g ? undefined : g }))}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time zone <span className="text-gray-400 text-xs">(Auto-detected, Optional)</span>
                  </label>
                  <input
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.timezone || ""}
                    onChange={(e) => setData((d) => ({ ...d, timezone: e.target.value }))}
                    placeholder="e.g., Asia/Dhaka"
                  />
                </div>
              </div>
            </Step>

            <Step>
              <div className="space-y-6">

                <SectionHeader title="What brings you to Monovo?" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main reasons <span className="text-gray-400 text-xs">(choose up to 2)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {REASONS.map((r) => (
                      <Chip key={r} label={r} selected={data.mainReasons.includes(r)} onClick={() => toggleInArray("mainReasons", r, 2)} />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills to strengthen <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.map((s) => (
                      <Chip key={s} label={s} selected={data.skills.includes(s)} onClick={() => toggleInArray("skills", s)} />
                    ))}
                  </div>
                </div>
              </div>
            </Step>

            <Step>
              <div className="space-y-6">

                <SectionHeader title="How have you been feeling lately?" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">General mood over the past week</label>
                  <div className="flex items-center gap-3">
                    {Object.keys(MOOD_EMOJI).map((k) => {
                      const val = Number(k);
                      const selected = data.moodWeek === val;
                      return (
                        <button
                          type="button"
                          key={k}
                          onClick={() => setData((d) => ({ ...d, moodWeek: val }))}
                          className={`text-3xl rounded-2xl p-2 border transition ${selected ? "border-blue-600 ring-2 ring-blue-200" : "border-transparent hover:border-gray-300"}`}
                          aria-label={`Mood ${val}`}
                        >
                          {MOOD_EMOJI[val]}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emotions you felt most often recently <span className="text-gray-400 text-xs">(choose up to 3)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EMOTIONS.map((e) => (
                      <Chip key={e} label={e} selected={data.topEmotions.includes(e)} onClick={() => toggleInArray("topEmotions", e, 3)} />
                    ))}
                  </div>
                </div>
              </div>
            </Step>

            <Step>
              <div className="space-y-6">
                <SectionHeader title="Reminders & last thing" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Daily mood reminders?</label>
                    <div className="flex flex-wrap gap-2">
                      {["morning", "evening", "no"].map((opt) => (
                        <Chip key={opt} label={opt === "no" ? "No reminders" : `Yes, ${opt}`} selected={data.wantReminders === opt} onClick={() => setData((d) => ({ ...d, wantReminders: opt }))} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred notification type <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["email", "in-app", "both"].map((opt) => (
                        <Chip key={opt} label={opt === "in-app" ? "In‑app" : opt === "both" ? "Both" : "Email"} selected={data.notifyType === opt} onClick={() => setData((d) => ({ ...d, notifyType: d.notifyType === opt ? undefined : opt }))} />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    If Monovo could help you with one thing starting today, what would it be? <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <textarea rows={3} className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Help me feel less overwhelmed at work" value={data.oneThing || ""} onChange={(e) => setData((d) => ({ ...d, oneThing: e.target.value }))} />
                </div>
                <details className="mt-2 text-sm text-gray-600">
                  <summary className="cursor-pointer select-none">Preview answers (dev only)</summary>
                  <pre className="bg-gray-50 p-3 rounded-lg overflow-auto">{JSON.stringify(data, null, 2)}</pre>
                </details>
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
    </div>
  );
}