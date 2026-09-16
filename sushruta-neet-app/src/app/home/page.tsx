'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, TrendingUp, Clock, Star, Zap, Target, ChevronRight, Brain, FlaskConical } from 'lucide-react';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';

const stats = [
  { label: "Today's Study", value: '2h 30m', icon: Clock,    iconColor: '#3b82f6', iconClass: 'stat-icon-blue'   },
  { label: 'Streak',        value: '7 days 🔥', icon: TrendingUp, iconColor: '#f59e0b', iconClass: 'stat-icon-amber'  },
  { label: 'Topics Today',  value: '8',       icon: BookOpen, iconColor: '#10b981', iconClass: 'stat-icon-green'  },
  { label: 'Accuracy',      value: '82%',     icon: Star,     iconColor: '#8b5cf6', iconClass: 'stat-icon-purple' },
];

const quickActions = [
  { label: 'Quick Quiz',    icon: Zap,          color: '#f59e0b', bg: 'var(--color-orange-light)', href: '/practice' },
  { label: 'Study Plan',    icon: Target,        color: '#10b981', bg: 'var(--color-green-light)',  href: '/study'    },
  { label: 'Flashcards',   icon: Brain,         color: '#8b5cf6', bg: 'var(--color-purple-light)', href: '/study'    },
  { label: 'Bio Lab',       icon: FlaskConical,  color: '#3b82f6', bg: 'var(--color-blue-light)',   href: '/study'    },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning ☀️';
  if (h < 17) return 'Good afternoon 🌤️';
  return 'Good evening 🌙';
}

export default function HomePage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 40); return () => clearTimeout(t); }, []);

  return (
    <div className="app-shell">
      {/* Sticky header */}
      <div className={`page-header animate-fade-slide-down delay-0`}>
        <h1 className="page-header-title">Home</h1>
      </div>

      <div className="overflow-y-auto pb-24 px-4 pt-5 space-y-4">

        {/* Hero banner */}
        <div
          className={`hero-gradient rounded-2xl p-5 animate-fade-slide-up delay-0`}
          style={{ boxShadow: '0 8px 32px rgba(16,185,129,0.25)' }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>
            {getGreeting()}
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#ffffff', margin: '0 0 4px' }}>
            Ready to study?
          </h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            Your goal: NEET 2026 · Keep it up! 🎯
          </p>

          {/* Progress bar */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Daily goal</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>2.5 / 4 hrs</span>
            </div>
            <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%', borderRadius: 99,
                  background: 'linear-gradient(90deg, #a7f3d0, #ffffff)',
                  width: '62%',
                  transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Quick stat cards */}
        <div className={`grid grid-cols-2 gap-3 animate-fade-slide-up delay-1`}>
          {stats.map(({ label, value, icon: Icon, iconColor, iconClass }) => (
            <div
              key={label}
              className="surface-card card-lift flex items-center gap-3 p-4"
            >
              <div
                className={`${iconClass} w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0`}
              >
                <Icon size={18} color={iconColor} />
              </div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>{value}</p>
                <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: 0 }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className={`animate-fade-slide-up delay-2`}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Quick Actions
          </p>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ label, icon: Icon, color, bg, href }) => (
              <a
                key={label}
                href={href}
                className="surface-card card-hover flex flex-col items-center justify-center gap-2 p-4"
                style={{ textDecoration: 'none', minHeight: 80 }}
              >
                <div
                  className="empty-state-icon w-11 h-11"
                  style={{ background: bg }}
                >
                  <Icon size={20} color={color} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Continue studying */}
        <div className={`surface-card p-4 animate-fade-slide-up delay-3`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>Continue Learning</p>
            <ChevronRight size={16} color="var(--color-text-muted)" />
          </div>
          <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
            {[
              { subject: 'Biology', topic: 'Cell Division & Mitosis', progress: 68, color: '#10b981' },
              { subject: 'Chemistry', topic: 'Organic Reactions', progress: 42, color: '#3b82f6' },
            ].map(({ subject, topic, progress, color }) => (
              <div
                key={subject}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 10,
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 11, color: color, fontWeight: 600, margin: 0 }}>{subject}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', margin: '2px 0 6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topic}</p>
                  <div style={{ height: 4, borderRadius: 99, background: 'var(--color-border)' }}>
                    <div style={{ height: '100%', borderRadius: 99, background: color, width: `${progress}%`, transition: 'width 1s ease' }} />
                  </div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: color, flexShrink: 0 }}>{progress}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <BottomNavigation />
    </div>
  );
}
