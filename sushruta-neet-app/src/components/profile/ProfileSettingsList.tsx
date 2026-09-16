import React from 'react';
import {
  SlidersHorizontal,
  Bell,
  Palette,
  Download,
  HelpCircle,
  Info,
} from 'lucide-react';
import { ProfileSettingsItem } from './ProfileSettingsItem';

interface ProfileSettingsListProps {
  appearance?: string;
}

export const ProfileSettingsList: React.FC<ProfileSettingsListProps> = ({
  appearance = 'Light',
}) => {
  const items = [
    {
      icon: <SlidersHorizontal size={18} />,
      label: 'Study Preferences',
      href: '/settings/study-preferences',
      rightLabel: undefined,
    },
    {
      icon: <Bell size={18} />,
      label: 'Notifications',
      href: '/settings/notifications',
      rightLabel: undefined,
    },
    {
      icon: <Palette size={18} />,
      label: 'App Appearance',
      href: '/settings/appearance',
      rightLabel: appearance.charAt(0).toUpperCase() + appearance.slice(1),
    },
    {
      icon: <Download size={18} />,
      label: 'Download Manager',
      href: '/settings/downloads',
      rightLabel: undefined,
    },
    {
      icon: <HelpCircle size={18} />,
      label: 'Help & Support',
      href: '/settings/help',
      rightLabel: undefined,
    },
    {
      icon: <Info size={18} />,
      label: 'About Sushruta',
      href: '/settings/about',
      rightLabel: undefined,
    },
  ];

  return (
    <div
      className="rounded-xl overflow-hidden bg-surface"
      style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}
    >
      {items.map((item, index) => (
        <ProfileSettingsItem
          key={item.href}
          icon={item.icon}
          label={item.label}
          href={item.href}
          rightLabel={item.rightLabel}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};
