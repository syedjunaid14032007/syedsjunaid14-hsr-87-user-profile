'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/profile');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#d1fae5] flex items-center justify-center">
          <span className="text-[#065f46] font-bold text-lg">S</span>
        </div>
        <div className="w-6 h-6 border-2 border-[#10b981] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
