'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  getStudyPreferences,
  updateStudyPreferences,
} from '@/services/preferencesService';
import { StudyPreferences } from '@/types/preferences';
import { ToastContainer, useToast } from '@/components/ui/Toast';

const SUBJECTS = ['Physics', 'Chemistry', 'Biology'];
const DIFFICULTIES = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export default function StudyPreferencesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [prefs, setPrefs] = useState<StudyPreferences>({
    dailyStudyMinutes: 360,
    preferredSubjects: ['Physics', 'Chemistry', 'Biology'],
    difficulty: 'medium',
    preferredStartTime: '18:00',
    remindersEnabled: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPrefs = useCallback(async () => {
    if (!user) return;
    try {
      const data = await getStudyPreferences(user.uid);
      if (data) setPrefs(data);
    } catch {
      showToast('Failed to load preferences.', 'error');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPrefs();
  }, [fetchPrefs]);

  const toggleSubject = (subject: string) => {
    setPrefs((p) => ({
      ...p,
      preferredSubjects: p.preferredSubjects.includes(subject)
        ? p.preferredSubjects.filter((s) => s !== subject)
        : [...p.preferredSubjects, subject],
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateStudyPreferences(user.uid, prefs);
      showToast('Study preferences saved!', 'success');
    } catch {
      showToast('Failed to save preferences.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-shell">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 bg-white border-b border-[#e8ecf0]">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f3f4f6] text-[#6b7685]"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1a2332] mr-8">
          Study Preferences
        </h1>
      </div>

      <div className="overflow-y-auto pb-24 px-4 pt-5 space-y-5">
        {/* Daily Study Goal */}
        <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #e8ecf0' }}>
          <h3 className="text-[13px] font-semibold text-[#6b7685] uppercase tracking-wide mb-3">
            Daily Study Goal
          </h3>
          <label htmlFor="daily-minutes" className="block text-sm font-medium text-[#1a2332] mb-1.5">
            Minutes per day: <span className="text-[#10b981] font-bold">{prefs.dailyStudyMinutes} min</span>
          </label>
          <input
            id="daily-minutes"
            type="range"
            min={60}
            max={720}
            step={30}
            value={prefs.dailyStudyMinutes}
            onChange={(e) => setPrefs((p) => ({ ...p, dailyStudyMinutes: parseInt(e.target.value) }))}
            className="w-full accent-[#10b981]"
          />
          <div className="flex justify-between text-[11px] text-[#9ca3af] mt-1">
            <span>1 hr</span><span>6 hrs</span><span>12 hrs</span>
          </div>
        </div>

        {/* Preferred Subjects */}
        <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #e8ecf0' }}>
          <h3 className="text-[13px] font-semibold text-[#6b7685] uppercase tracking-wide mb-3">
            Preferred Subjects
          </h3>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((subject) => {
              const active = prefs.preferredSubjects.includes(subject);
              return (
                <button
                  key={subject}
                  onClick={() => toggleSubject(subject)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    active
                      ? 'bg-[#d1fae5] border-[#6ee7b7] text-[#065f46]'
                      : 'bg-white border-[#e8ecf0] text-[#6b7685]'
                  }`}
                >
                  {active && <Check size={12} />}
                  {subject}
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty */}
        <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #e8ecf0' }}>
          <h3 className="text-[13px] font-semibold text-[#6b7685] uppercase tracking-wide mb-3">
            Difficulty Preference
          </h3>
          <div className="flex gap-2">
            {DIFFICULTIES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setPrefs((p) => ({ ...p, difficulty: value as StudyPreferences['difficulty'] }))}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  prefs.difficulty === value
                    ? 'bg-[#10b981] border-[#10b981] text-white'
                    : 'bg-white border-[#e8ecf0] text-[#6b7685]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Start Time */}
        <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #e8ecf0' }}>
          <h3 className="text-[13px] font-semibold text-[#6b7685] uppercase tracking-wide mb-3">
            Preferred Start Time
          </h3>
          <input
            id="start-time"
            type="time"
            value={prefs.preferredStartTime}
            onChange={(e) => setPrefs((p) => ({ ...p, preferredStartTime: e.target.value }))}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] outline-none text-[#1a2332]"
          />
        </div>

        {/* Reminders */}
        <div className="bg-white rounded-xl p-4 flex items-center justify-between" style={{ border: '1px solid #e8ecf0' }}>
          <div>
            <p className="text-[14px] font-medium text-[#1a2332]">Study Reminders</p>
            <p className="text-[12px] text-[#9ca3af]">Get reminded at your preferred time</p>
          </div>
          <button
            onClick={() => setPrefs((p) => ({ ...p, remindersEnabled: !p.remindersEnabled }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${prefs.remindersEnabled ? 'bg-[#10b981]' : 'bg-[#e5e7eb]'}`}
            aria-label="Toggle reminders"
            aria-pressed={prefs.remindersEnabled}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${prefs.remindersEnabled ? 'translate-x-7' : 'translate-x-1'}`}
            />
          </button>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3.5 rounded-xl text-[15px] font-semibold text-white disabled:opacity-60 press-effect"
          style={{ backgroundColor: '#10b981' }}
        >
          {saving ? 'Saving…' : 'Save Preferences'}
        </button>
      </div>

      <BottomNavigation />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
