'use client';

import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/firebase/auth';

interface SignOutButtonProps {
  onToast?: (message: string, type?: 'success' | 'error') => void;
}

export const SignOutButton: React.FC<SignOutButtonProps> = ({ onToast }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      router.replace('/login');
    } catch {
      onToast?.('Failed to sign out. Please try again.', 'error');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 font-semibold text-[14px] disabled:opacity-60 signout-btn signout-hover"
      aria-label="Sign out of your account"
    >
      <LogOut size={17} />
      {loading ? 'Signing out…' : 'Sign Out'}
    </button>
  );
};
