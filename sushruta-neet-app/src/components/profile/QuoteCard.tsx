'use client';

import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { updateProfile } from '@/services/profileService';
import { UserProfile } from '@/types/profile';

interface QuoteCardProps {
  quote: string;
  uid: string;
  onUpdate: (newQuote: string) => void;
  onToast?: (message: string, type?: 'success' | 'error') => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, uid, onUpdate, onToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState(quote);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!draft.trim()) return;
    setSaving(true);
    try {
      await updateProfile(uid, { quote: draft.trim() });
      onUpdate(draft.trim());
      setIsOpen(false);
      onToast?.('Quote updated!', 'success');
    } catch {
      onToast?.('Failed to update quote.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl mx-0 quote-card-bg card-row-hover"
        style={{
          border: '1px solid',
          minHeight: '44px',
        }}
      >
        <p
          className="flex-1 text-[13px] italic leading-snug quote-card-text"
          style={{ fontStyle: 'italic' }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        <button
          onClick={() => { setDraft(quote); setIsOpen(true); }}
          className="flex-shrink-0 p-1 rounded-lg quote-card-btn text-[#6b7685] hover:text-[#3b82f6] icon-bounce-hover"
          aria-label="Edit motivational quote"
        >
          <Pencil size={15} />
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Quote" size="sm">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="quote-input"
              className="block text-sm font-medium text-[#1a2332] mb-1.5"
            >
              Motivational quote
            </label>
            <textarea
              id="quote-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              maxLength={200}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none resize-none text-[#1a2332] placeholder-[#9ca3af]"
              placeholder="Enter your motivational quote..."
              autoFocus
            />
            <p className="text-xs text-[#9ca3af] mt-1 text-right">{draft.length}/200</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2.5 rounded-xl border border-[#e8ecf0] text-sm font-medium text-[#6b7685] hover:bg-[#f9fafb]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !draft.trim()}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
              style={{ backgroundColor: '#10b981' }}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
