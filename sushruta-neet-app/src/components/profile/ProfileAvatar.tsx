import React from 'react';

interface ProfileAvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ initials, size = 'md' }) => {
  const sizeMap = {
    sm: { outer: 'w-10 h-10', text: 'text-sm' },
    md: { outer: 'w-[60px] h-[60px]', text: 'text-xl' },
    lg: { outer: 'w-20 h-20', text: 'text-2xl' },
  };

  const { outer, text } = sizeMap[size];

  return (
    <div
      className={`${outer} rounded-full flex items-center justify-center flex-shrink-0`}
      style={{ backgroundColor: '#d1fae5' }}
      aria-label={`Avatar with initials ${initials}`}
    >
      <span
        className={`font-bold ${text} select-none`}
        style={{ color: '#065f46' }}
      >
        {initials}
      </span>
    </div>
  );
};
