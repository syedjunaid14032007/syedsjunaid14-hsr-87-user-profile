import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ProfileSettingsItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  rightLabel?: string;
  isLast?: boolean;
}

export const ProfileSettingsItem: React.FC<ProfileSettingsItemProps> = ({
  icon,
  label,
  href,
  rightLabel,
  isLast = false,
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3.5 px-4 py-[14px] bg-surface settings-item-hover settings-row-hover press-effect ${
        !isLast ? 'border-b border-default' : ''
      }`}
    >
      {/* Icon */}
      <div className="w-5 h-5 flex items-center justify-center text-secondary flex-shrink-0 icon-spin-hover">
        {icon}
      </div>

      {/* Label */}
      <span className="flex-1 text-[14.5px] font-medium text-primary">{label}</span>

      {/* Right content */}
      <div className="flex items-center gap-1.5">
        {rightLabel && (
          <span className="text-[13px] text-muted font-normal">{rightLabel}</span>
        )}
        <ChevronRight size={16} className="text-muted chevron-nudge" />
      </div>
    </Link>
  );
};
