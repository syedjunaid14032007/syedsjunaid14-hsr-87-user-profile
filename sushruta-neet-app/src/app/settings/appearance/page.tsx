'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Sun, Moon, Monitor, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { getProfile, updateProfile } from '@/services/profileService';
import { ToastContainer, useToast } from '@/components/ui/Toast';

type AppearanceMode = 'light' | 'dark' | 'system';

const options: Array<{ value: AppearanceMode; label: string; icon: React.ReactNode; desc: string; accent: string; bg: string }> = [
  {
    value: 'light',
    label: 'Light',
    icon: <Sun size={20} />,
    desc: 'White background, always on',
    accent: '#f59e0b',
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: <Moon size={20} />,
    desc: 'Dark background, easier at night',
    accent: '#818cf8',
    bg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
  },
  {
    value: 'system',
    label: 'System',
    icon: <Monitor size={20} />,
    desc: 'Follows your device settings',
    accent: '#10b981',
    bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  },
];

/** Apply the theme class to <html> immediately */
function applyTheme(mode: AppearanceMode) {
  const html = document.documentElement;
  html.classList.remove('light', 'dark');
  if (mode !== 'system') {
    html.classList.add(mode);
  }
  // persist so page refreshes remember the choice
  localStorage.setItem('theme', mode);
}

export default function AppearancePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [mode, setMode] = useState<AppearanceMode>('light');
  const [saving, setSaving] = useState(false);

  // On mount: restore from localStorage first (instant), then sync from DB
  useEffect(() => {
    const saved = localStorage.getItem('theme') as AppearanceMode | null;
    if (saved) {
      setMode(saved);
      applyTheme(saved);
    }
  }, []);

  const fetchAppearance = useCallback(async () => {
    if (!user) return;
    const profile = await getProfile(user.uid);
    if (profile?.appearance) {
      setMode(profile.appearance);
      applyTheme(profile.appearance);
    }
  }, [user]);

  useEffect(() => { fetchAppearance(); }, [fetchAppearance]);

  const handleSelect = async (selected: AppearanceMode) => {
    setMode(selected);
    applyTheme(selected); // instant visual change
    setSaving(true);
    try {
      await updateProfile(user!.uid, { appearance: selected });
      showToast(`Theme set to ${selected}!`, 'success');
    } catch {
      showToast('Failed to save appearance.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-shell" style={{ background: 'var(--color-bg)', minHeight: '100dvh' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 16px',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <button
          onClick={() => router.back()}
          style={{
            width: 32, height: 32, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', color: 'var(--color-text-secondary)',
          }}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 style={{
          flex: 1, textAlign: 'center', fontSize: 17, fontWeight: 700,
          color: 'var(--color-text-primary)', marginRight: 32, margin: 0,
        }}>
          App Appearance
        </h1>
      </div>

      <div style={{ overflowY: 'auto', paddingBottom: 96, padding: '20px 16px 96px' }}>
        <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 16 }}>
          Choose how Sushruta looks to you. Changes apply instantly.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {options.map(({ value, label, icon, desc, accent, bg }) => {
            const isSelected = mode === value;
            return (
              <button
                key={value}
                onClick={() => handleSelect(value)}
                disabled={saving}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px',
                  borderRadius: 16,
                  border: isSelected ? `2px solid ${accent}` : '2px solid var(--color-border)',
                  background: isSelected ? bg : 'var(--color-surface)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: isSelected ? `0 4px 16px ${accent}30` : 'var(--shadow-card)',
                  transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Icon pill */}
                <div style={{
                  width: 44, height: 44,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isSelected ? `${accent}20` : 'var(--color-bg)',
                  color: isSelected ? accent : 'var(--color-text-secondary)',
                  flexShrink: 0,
                }}>
                  {icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: 14, fontWeight: 600, margin: 0,
                    color: isSelected ? accent : 'var(--color-text-primary)',
                  }}>
                    {label}
                  </p>
                  <p style={{ fontSize: 12, margin: '2px 0 0', color: 'var(--color-text-muted)' }}>
                    {desc}
                  </p>
                </div>

                {/* Check mark */}
                {isSelected && (
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Check size={14} color="#fff" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Live preview strip */}
        <div style={{
          marginTop: 24,
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{
            background: 'var(--color-surface)',
            padding: '12px 14px',
            borderBottom: '1px solid var(--color-border)',
          }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Live Preview
            </p>
          </div>
          <div style={{ background: 'var(--color-bg)', padding: '14px' }}>
            <div style={{ background: 'var(--color-surface)', borderRadius: 10, padding: 12, border: '1px solid var(--color-border)' }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>Sample Card</p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--color-text-muted)' }}>This is how content will look.</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
