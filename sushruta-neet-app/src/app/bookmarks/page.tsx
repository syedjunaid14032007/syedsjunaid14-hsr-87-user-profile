'use client';

import React, { useEffect, useState } from 'react';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { Bookmark, BookOpen, FlaskConical, Atom, Search, SlidersHorizontal } from 'lucide-react';

type FilterKey = 'All' | 'Biology' | 'Physics' | 'Chemistry';

const subjectMeta: Record<string, { color: string; icon: React.ReactNode }> = {
  Biology:   { color: '#10b981', icon: <BookOpen  size={14} color="#10b981" /> },
  Physics:   { color: '#3b82f6', icon: <Atom       size={14} color="#3b82f6" /> },
  Chemistry: { color: '#8b5cf6', icon: <FlaskConical size={14} color="#8b5cf6" /> },
};

const bookmarks = [
  { id: 1, subject: 'Biology',   topic: 'Mitosis vs Meiosis',        type: 'Note',     date: 'Today' },
  { id: 2, subject: 'Chemistry', topic: 'Grignard Reagent Reactions', type: 'Question', date: 'Yesterday' },
  { id: 3, subject: 'Physics',   topic: 'Kirchhoff\'s Laws',          type: 'Question', date: '2 days ago' },
  { id: 4, subject: 'Biology',   topic: 'Photosynthesis Pathways',    type: 'Note',     date: '3 days ago' },
  { id: 5, subject: 'Chemistry', topic: 'Benzene Aromaticity',        type: 'Question', date: '4 days ago' },
  { id: 6, subject: 'Physics',   topic: 'Wave Optics — Diffraction',  type: 'Note',     date: '5 days ago' },
];

const filters: FilterKey[] = ['All', 'Biology', 'Physics', 'Chemistry'];

export default function BookmarksPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 40); return () => clearTimeout(t); }, []);

  const filtered = bookmarks.filter((b) => {
    const matchFilter = activeFilter === 'All' || b.subject === activeFilter;
    const matchSearch = b.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        b.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="app-shell">
      {/* Sticky header */}
      <div className="page-header animate-fade-slide-down delay-0">
        <h1 className="page-header-title">Bookmarks</h1>
      </div>

      <div className="overflow-y-auto pb-24 pt-4" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* Search bar */}
        <div className="px-4 animate-fade-slide-up delay-0" style={{ marginBottom: 12 }}>
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 12, padding: '10px 14px',
            }}
          >
            <Search size={16} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search bookmarks…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1, border: 'none', background: 'transparent', outline: 'none',
                fontSize: 14, color: 'var(--color-text-primary)', fontFamily: 'inherit',
              }}
            />
            <SlidersHorizontal size={16} color="var(--color-text-muted)" />
          </div>
        </div>

        {/* Filter chips */}
        <div
          className="px-4 animate-fade-slide-up delay-1"
          style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}
        >
          {filters.map((f) => {
            const active = activeFilter === f;
            const meta = subjectMeta[f];
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '6px 14px', borderRadius: 99, flexShrink: 0,
                  border: active ? `1.5px solid ${meta?.color ?? '#10b981'}` : '1.5px solid var(--color-border)',
                  background: active ? (meta ? `${meta.color}18` : 'var(--color-green-light)') : 'var(--color-surface)',
                  color: active ? (meta?.color ?? '#10b981') : 'var(--color-text-secondary)',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {meta && active && meta.icon}
                {f}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <div className="px-4 animate-fade-slide-up delay-2" style={{ marginBottom: 10 }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0 }}>
            {filtered.length} saved item{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* List */}
        <div className="px-4" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.length === 0 ? (
            <div
              className="surface-card animate-fade-scale"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 12 }}
            >
              <div className="animate-float">
                <Bookmark size={32} color="var(--color-text-muted)" />
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0, textAlign: 'center' }}>
                No bookmarks found
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0, textAlign: 'center' }}>
                Try a different filter or search term
              </p>
            </div>
          ) : (
            filtered.map(({ id, subject, topic, type, date }, i) => {
              const meta = subjectMeta[subject];
              return (
                <div
                  key={id}
                  className={`surface-card card-hover animate-fade-slide-up delay-${Math.min(i + 3, 6)}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }}
                >
                  {/* Bookmark icon strip */}
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `${meta.color}15`,
                    }}
                  >
                    <Bookmark size={16} color={meta.color} fill={meta.color} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      {meta.icon}
                      <span style={{ fontSize: 11, fontWeight: 600, color: meta.color }}>{subject}</span>
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 99,
                        background: 'var(--color-bg)', color: 'var(--color-text-muted)',
                        border: '1px solid var(--color-border)', textTransform: 'uppercase', letterSpacing: '0.05em'
                      }}>
                        {type}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topic}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: 0 }}>{date}</p>
                  </div>

                  {/* Remove bookmark */}
                  <button
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                    }}
                    className="edit-btn-hover"
                    aria-label="Remove bookmark"
                  >
                    <Bookmark size={15} color="var(--color-text-muted)" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer nudge */}
        {filtered.length > 0 && (
          <p className="animate-fade-slide-up delay-6" style={{ textAlign: 'center', fontSize: 12, color: 'var(--color-text-muted)', marginTop: 20, paddingBottom: 4 }}>
            Tap a bookmark to review it ✨
          </p>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
