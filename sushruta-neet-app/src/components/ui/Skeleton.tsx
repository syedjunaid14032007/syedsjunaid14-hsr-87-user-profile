import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '16px',
  rounded = 'md',
}) => {
  const roundedMap = {
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  };

  return (
    <div
      className={`skeleton ${roundedMap[rounded]} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};

// Profile page skeleton
export const ProfilePageSkeleton: React.FC = () => (
  <div className="px-4 pt-4 pb-24 space-y-4">
    {/* Avatar + name */}
    <div className="flex items-center gap-3 py-2">
      <Skeleton width="60px" height="60px" rounded="full" />
      <div className="flex-1 space-y-2">
        <Skeleton width="140px" height="18px" />
        <Skeleton width="100px" height="13px" />
      </div>
    </div>

    {/* Quote card */}
    <Skeleton height="44px" rounded="lg" />

    {/* Goal card */}
    <Skeleton height="60px" rounded="lg" />

    {/* Stats grid */}
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} height="80px" rounded="lg" />
      ))}
    </div>

    {/* Settings list */}
    <div className="space-y-0.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} height="52px" rounded="sm" />
      ))}
    </div>

    {/* Sign out button */}
    <Skeleton height="48px" rounded="lg" />
  </div>
);
