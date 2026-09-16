'use client';

import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { updateProfile } from '@/services/profileService';
import { UserGoal } from '@/types/profile';

interface GoalCardProps {
  goal: UserGoal;
  uid: string;
  onUpdate: (newGoal: UserGoal) => void;
  onToast?: (message: string, type?: 'success' | 'error') => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, uid, onUpdate, onToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<UserGoal>(goal);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(uid, { goal: draft });
      onUpdate(draft);
      setIsOpen(false);
      onToast?.('Goal updated!', 'success');
    } catch {
      onToast?.('Failed to update goal.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const goalLabel = `${goal.exam} ${goal.year}`;

  return (
    <>
      <div
        className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-surface card-row-hover"
        style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}
      >
        {/* Icon */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 goal-icon-bg icon-spin-hover"
        >
          <Target size={18} color="#10b981" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[12px] text-secondary font-medium">My Goal</p>
          <p className="text-[15px] font-bold text-primary leading-tight">{goalLabel}</p>
        </div>

        {/* Edit button */}
        <button
          onClick={() => { setDraft(goal); setIsOpen(true); }}
          className="text-[13px] font-semibold px-3 py-1 rounded-lg hover:bg-[#f0f4ff] text-[#3b82f6] quote-card-btn icon-bounce-hover"
          aria-label="Edit goal"
        >
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Goal" size="sm">
        <div className="space-y-4">
          <div>
            <label htmlFor="goal-exam" className="block text-sm font-medium text-[#1a2332] mb-1.5">
              Exam
            </label>
            <input
              id="goal-exam"
              type="text"
              value={draft.exam}
              onChange={(e) => setDraft((d) => ({ ...d, exam: e.target.value }))}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332]"
              placeholder="NEET"
            />
          </div>
          <div>
            <label htmlFor="goal-year" className="block text-sm font-medium text-[#1a2332] mb-1.5">
              Target Year
            </label>
            <input
              id="goal-year"
              type="number"
              value={draft.year}
              onChange={(e) => setDraft((d) => ({ ...d, year: parseInt(e.target.value) || 2026 }))}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332]"
              placeholder="2026"
              min="2025"
              max="2035"
            />
          </div>
          <div>
            <label htmlFor="goal-rank" className="block text-sm font-medium text-[#1a2332] mb-1.5">
              Target Rank <span className="text-[#9ca3af] font-normal">(optional)</span>
            </label>
            <input
              id="goal-rank"
              type="number"
              value={draft.targetRank || ''}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  targetRank: e.target.value ? parseInt(e.target.value) : undefined,
                }))
              }
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332]"
              placeholder="e.g. 1000"
            />
          </div>
          <div>
            <label htmlFor="goal-score" className="block text-sm font-medium text-[#1a2332] mb-1.5">
              Target Score <span className="text-[#9ca3af] font-normal">(optional)</span>
            </label>
            <input
              id="goal-score"
              type="number"
              value={draft.targetScore || ''}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  targetScore: e.target.value ? parseInt(e.target.value) : undefined,
                }))
              }
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332]"
              placeholder="e.g. 680"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2.5 rounded-xl border border-[#e8ecf0] text-sm font-medium text-[#6b7685] hover:bg-[#f9fafb]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
              style={{ backgroundColor: '#10b981' }}
            >
              {saving ? 'Saving…' : 'Save Goal'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
