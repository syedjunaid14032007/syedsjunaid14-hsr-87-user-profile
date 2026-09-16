import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  valueColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBg,
  valueColor = '#1a2332',
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-surface card-lift"
      style={{
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        minHeight: '88px',
      }}
    >
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>

      {/* Value */}
      <p
        className="text-[18px] font-extrabold leading-none mb-1"
        style={{ color: valueColor || 'var(--color-text-primary)' }}
      >
        {value}
      </p>

      {/* Label */}
      <p className="text-[10px] text-[#9ca3af] text-center leading-tight font-medium">
        {title}
      </p>
    </div>
  );
};
