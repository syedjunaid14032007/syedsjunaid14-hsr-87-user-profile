'use client';

import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import Link from 'next/link';

interface ProfileHeaderProps {
  title?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ title = 'Profile' }) => {
  return (
    <div
      className="flex items-center justify-between px-4 py-3.5 bg-surface border-b border-default"
      style={{ minHeight: '52px' }}
    >
      {/* Left spacer for centering */}
      <div className="w-8" />

      {/* Title */}
      <h1 className="text-[17px] font-bold text-primary tracking-tight">{title}</h1>

      {/* Settings icon */}
      <Link
        href="/settings/appearance"
        className="w-8 h-8 flex items-center justify-center rounded-full edit-btn-hover text-secondary"
        aria-label="Open settings"
      >
        <Settings size={20} />
      </Link>
    </div>
  );
};
