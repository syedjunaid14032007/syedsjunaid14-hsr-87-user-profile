'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Bell, BookOpen, ClipboardList, Sparkles, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from '@/services/preferencesService';
import { NotificationPreferences } from '@/types/preferences';
import { ToastContainer, useToast } from '@/components/ui/Toast';

interface ToggleItem {
  key: keyof NotificationPreferences;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const toggleItems: ToggleItem[] = [
  {
    key: 'studyReminders',
    label: 'Study Reminders',
    description: 'Reminders to study at your preferred time',
    icon: <BookOpen size={18} />,
    color: '#3b82f6',
    bgColor: '#dbeafe',
  },
  {
    key: 'mockTestReminders',
    label: 'Mock Test Reminders',
    description: 'Reminders for scheduled mock tests',
    icon: <ClipboardList size={18} />,
    color: '#8b5cf6',
    bgColor: '#ede9fe',
  },
  {
    key: 'dailyMotivation',
    label: 'Daily Motivation',
    description: 'A daily motivational message to keep going',
    icon: <Sparkles size={18} />,
    color: '#f59e0b',
    bgColor: '#fef3c7',
  },
  {
    key: 'achievementNotifications',
    label: 'Achievement Alerts',
    description: 'Get notified when you earn achievements',
    icon: <Trophy size={18} />,
    color: '#10b981',
    bgColor: '#d1fae5',
  },
];

export default function NotificationsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [prefs, setPrefs] = useState<NotificationPreferences>({
    studyReminders: true,
    mockTestReminders: true,
    dailyMotivation: true,
    achievementNotifications: true,
  });
  const [saving, setSaving] = useState(false);

  const fetchPrefs = useCallback(async () => {
    if (!user) return;
    try {
      const data = await getNotificationPreferences(user.uid);
      if (data) setPrefs(data);
    } catch {}
  }, [user]);

  useEffect(() => { fetchPrefs(); }, [fetchPrefs]);

  const toggle = (key: keyof NotificationPreferences) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateNotificationPreferences(user.uid, prefs);
      showToast('Notification settings saved!', 'success');
    } catch {
      showToast('Failed to save settings.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const enabledCount = Object.values(prefs).filter(Boolean).length;

  return (
    <div className="app-shell" style={{ background: 'var(--color-bg)', minHeight: '100dvh' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <button
          onClick={() => router.back()}
          style={{
            width: 32, height: 32, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-text-secondary)',
          }}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 style={{
          flex: 1, textAlign: 'center', fontSize: 17, fontWeight: 700,
          color: 'var(--color-text-primary)', margin: 0, marginRight: 32,
        }}>
          Notifications
        </h1>
      </div>

      <div style={{ overflowY: 'auto', padding: '20px 16px 96px' }}>

        {/* Summary banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 16px',
          borderRadius: 14,
          background: enabledCount > 0
            ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'
            : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
          border: `1px solid ${enabledCount > 0 ? '#6ee7b7' : '#d1d5db'}`,
          marginBottom: 20,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: enabledCount > 0 ? '#10b981' : '#9ca3af',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Bell size={18} color="#fff" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: enabledCount > 0 ? '#065f46' : '#374151' }}>
              {enabledCount} of {toggleItems.length} notifications enabled
            </p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: enabledCount > 0 ? '#059669' : '#6b7280' }}>
              {enabledCount === 0 ? 'All notifications are off' : 'Tap any toggle to change'}
            </p>
          </div>
        </div>

        {/* Toggle cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {toggleItems.map(({ key, label, description, icon, color, bgColor }) => {
            const isOn = prefs[key];
            return (
              <div
                key={key}
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: 16,
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  border: isOn ? `1.5px solid ${color}40` : '1.5px solid var(--color-border)',
                  boxShadow: isOn ? `0 2px 12px ${color}18` : 'var(--shadow-card)',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isOn ? bgColor : 'var(--color-bg)',
                  color: isOn ? color : 'var(--color-text-muted)',
                  transition: 'all 0.2s ease',
                }}>
                  {icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: 0, fontSize: 14, fontWeight: 600,
                    color: isOn ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  }}>
                    {label}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-muted)' }}>
                    {description}
                  </p>
                </div>

                {/* Status label + Toggle */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: isOn ? color : '#9ca3af',
                    padding: '2px 6px',
                    borderRadius: 100,
                    background: isOn ? `${color}18` : '#f3f4f6',
                  }}>
                    {isOn ? 'ON' : 'OFF'}
                  </span>
                  <button
                    onClick={() => toggle(key)}
                    role="switch"
                    aria-checked={isOn}
                    aria-label={`Toggle ${label}`}
                    style={{
                      position: 'relative',
                      width: 52,
                      height: 28,
                      borderRadius: 100,
                      background: isOn
                        ? `linear-gradient(135deg, ${color}, ${color}cc)`
                        : '#d1d5db',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.25s ease',
                      boxShadow: isOn ? `0 2px 8px ${color}50` : 'none',
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      top: 3,
                      left: isOn ? 27 : 3,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: '#ffffff',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                      transition: 'left 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                    }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="press-effect"
          style={{
            width: '100%',
            marginTop: 20,
            padding: '15px',
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 700,
            color: '#fff',
            background: saving
              ? '#9ca3af'
              : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            border: 'none',
            cursor: saving ? 'not-allowed' : 'pointer',
            boxShadow: saving ? 'none' : '0 4px 16px #10b98140',
            transition: 'all 0.2s ease',
            letterSpacing: '0.01em',
          }}
        >
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </div>

      <BottomNavigation />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
