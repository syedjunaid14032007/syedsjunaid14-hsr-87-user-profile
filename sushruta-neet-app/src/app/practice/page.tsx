'use client';

import React, { useEffect, useState } from 'react';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { ClipboardList, Timer, BarChart2, BookMarked, ChevronRight, Zap, Trophy, Lock } from 'lucide-react';

const practiceCategories = [
  {
    title: 'Quick 10',
    desc: '10 questions · ~5 min',
    icon: Zap,
    color: '#f59e0b',
    bg: 'var(--color-orange-light)',
    badge: 'Popular',
    badgeColor: '#f59e0b',
    locked: false,
  },
  {
    title: 'Chapter Test',
    desc: '30 questions · ~25 min',
    icon: ClipboardList,
    color: '#8b5cf6',
    bg: 'var(--color-purple-light)',
    badge: null,
    locked: false,
  },
  {
    title: 'Mock NEET',
    desc: '180 questions · 3 hrs',
    icon: Timer,
    color: '#3b82f6',
    bg: 'var(--color-blue-light)',
    badge: 'Full',
    badgeColor: '#3b82f6',
    locked: false,
  },
  {
    title: 'PYQ Bank',
    desc: 'Previous year questions',
    icon: BookMarked,
    color: '#10b981',
    bg: 'var(--color-green-light)',
    badge: null,
    locked: false,
  },
  {
    title: 'Analytics',
    desc: 'Track your performance',
    icon: BarChart2,
    color: '#6b7685',
    bg: 'var(--color-border)',
    badge: 'Soon',
    badgeColor: '#6b7685',
    locked: true,
  },
];

const recentScores = [
  { test: 'Quick 10 — Biology', score: 8, total: 10, date: 'Today' },
  { test: 'Chapter — Organic Chem', score: 21, total: 30, date: 'Yesterday' },
  { test: 'Mock NEET #3', score: 132, total: 180, date: '3 days ago' },
];

export default function PracticePage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 40); return () => clearTimeout(t); }, []);

  return (
    <div className="app-shell">
      {/* Sticky header */}
      <div className="page-header animate-fade-slide-down delay-0">
        <h1 className="page-header-title">Practice</h1>
      </div>

      <div className="overflow-y-auto pb-24 px-4 pt-5 space-y-4">

        {/* Hero */}
        <div
          className="rounded-2xl p-5 animate-fade-slide-up delay-0"
          style={{
            background: 'linear-gradient(135deg, var(--color-purple-light) 0%, var(--color-blue-light) 100%)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="animate-float" style={{ display: 'inline-block', marginBottom: 10 }}>
            <div
              className="empty-state-icon w-14 h-14"
              style={{ background: 'var(--color-purple-light)', border: '2px solid rgba(139,92,246,0.2)' }}
            >
              <ClipboardList size={26} color="#8b5cf6" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>
                Practice Tests
              </h2>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
                Mock tests, chapter-wise practice &amp; PYQs
              </p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Trophy size={20} color="#f59e0b" />
            </div>
          </div>
        </div>

        {/* Test categories */}
        <div className="animate-fade-slide-up delay-1">
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Choose Test Type
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {practiceCategories.map(({ title, desc, icon: Icon, color, bg, badge, badgeColor, locked }, i) => (
              <button
                key={title}
                className={`surface-card card-hover w-full animate-fade-slide-up delay-${i + 2}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                  textAlign: 'left', cursor: locked ? 'not-allowed' : 'pointer',
                  opacity: locked ? 0.6 : 1,
                }}
                disabled={locked}
              >
                <div className="empty-state-icon w-11 h-11 flex-shrink-0" style={{ background: bg }}>
                  <Icon size={20} color={color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>{title}</p>
                    {badge && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 99,
                        background: `${badgeColor}20`, color: badgeColor, textTransform: 'uppercase', letterSpacing: '0.05em'
                      }}>
                        {badge}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: '2px 0 0' }}>{desc}</p>
                </div>
                {locked
                  ? <Lock size={16} color="var(--color-text-muted)" />
                  : <ChevronRight size={16} color="var(--color-text-muted)" className="chevron-nudge" />
                }
              </button>
            ))}
          </div>
        </div>

        {/* Recent scores */}
        <div className="animate-fade-slide-up delay-6">
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Recent Scores
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentScores.map(({ test, score, total, date }) => {
              const pct = Math.round((score / total) * 100);
              const col = pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
              return (
                <div key={test} className="surface-card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{test}</p>
                    <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: '2px 0 0' }}>{date}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: col, flexShrink: 0 }}>{score}/{total}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: col, background: `${col}18`, padding: '2px 8px', borderRadius: 99, flexShrink: 0 }}>
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <BottomNavigation />
    </div>
  );
}
