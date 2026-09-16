'use client';

import React, { useEffect, useState } from 'react';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { BookOpen, Atom, FlaskConical, Calculator, ChevronRight, Clock, Play } from 'lucide-react';

const subjects = [
  {
    name: 'Biology',
    icon: BookOpen,
    color: '#10b981',
    bg: 'var(--color-green-light)',
    topics: 38,
    progress: 64,
    lastStudied: '2 hrs ago',
  },
  {
    name: 'Physics',
    icon: Atom,
    color: '#3b82f6',
    bg: 'var(--color-blue-light)',
    topics: 27,
    progress: 41,
    lastStudied: 'Yesterday',
  },
  {
    name: 'Chemistry',
    icon: FlaskConical,
    color: '#8b5cf6',
    bg: 'var(--color-purple-light)',
    topics: 31,
    progress: 52,
    lastStudied: '3 hrs ago',
  },
  {
    name: 'Mathematics',
    icon: Calculator,
    color: '#f59e0b',
    bg: 'var(--color-orange-light)',
    topics: 22,
    progress: 29,
    lastStudied: '2 days ago',
  },
];

export default function StudyPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 40); return () => clearTimeout(t); }, []);

  return (
    <div className="app-shell">
      {/* Sticky header */}
      <div className="page-header animate-fade-slide-down delay-0">
        <h1 className="page-header-title">Study</h1>
      </div>

      <div className="overflow-y-auto pb-24 px-4 pt-5 space-y-4">

        {/* Hero */}
        <div
          className="rounded-2xl p-5 animate-fade-slide-up delay-0"
          style={{
            background: 'linear-gradient(135deg, var(--color-blue-light) 0%, var(--color-purple-light) 100%)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="animate-float" style={{ display: 'inline-block', marginBottom: 10 }}>
            <div
              className="empty-state-icon w-14 h-14"
              style={{ background: 'var(--color-blue-light)', border: '2px solid rgba(59,130,246,0.2)' }}
            >
              <BookOpen size={26} color="#3b82f6" />
            </div>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>
            Study Mode
          </h2>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
            Topic-wise learning, revision cards &amp; more are on the way!
          </p>
        </div>

        {/* Subject cards */}
        <div className="animate-fade-slide-up delay-1">
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Your Subjects
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {subjects.map(({ name, icon: Icon, color, bg, topics, progress, lastStudied }, i) => (
              <div
                key={name}
                className={`surface-card card-hover p-4 animate-fade-slide-up delay-${i + 2}`}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* icon */}
                  <div className="empty-state-icon w-11 h-11 flex-shrink-0" style={{ background: bg }}>
                    <Icon size={20} color={color} />
                  </div>

                  {/* info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>{name}</p>
                      <span style={{ fontSize: 12, fontWeight: 700, color }}>  {progress}%</span>
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: '2px 0 8px' }}>
                      {topics} topics · Last: {lastStudied}
                    </p>
                    {/* progress bar */}
                    <div style={{ height: 5, borderRadius: 99, background: 'var(--color-border)' }}>
                      <div
                        style={{
                          height: '100%', borderRadius: 99, background: color,
                          width: `${progress}%`,
                          transition: 'width 1.1s cubic-bezier(0.22,1,0.36,1)',
                        }}
                      />
                    </div>
                  </div>

                  {/* play button */}
                  <button
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, border: 'none', cursor: 'pointer',
                    }}
                  >
                    <Play size={13} color={color} fill={color} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming soon banner */}
        <div
          className="surface-card p-4 animate-fade-slide-up delay-6"
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <Clock size={18} color="var(--color-text-muted)" />
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
            Revision cards &amp; AI summaries — <strong>coming soon!</strong>
          </p>
          <ChevronRight size={16} color="var(--color-text-muted)" style={{ marginLeft: 'auto', flexShrink: 0 }} />
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
