'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { signUpWithEmail } from '@/lib/firebase/auth';
import { useAuth } from '@/contexts/AuthContext';
import { createDefaultProfile } from '@/services/profileService';
import { createDefaultStats } from '@/services/statsService';
import {
  createDefaultStudyPreferences,
  createDefaultNotificationPreferences,
} from '@/services/preferencesService';

export default function RegisterPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && user) router.replace('/profile');
  }, [user, loading, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const { user: newUser } = await signUpWithEmail(email, password, name.trim());

      // Create all Firestore documents in parallel
      await Promise.all([
        createDefaultProfile(newUser.uid, name.trim(), email),
        createDefaultStats(newUser.uid),
        createDefaultStudyPreferences(newUser.uid),
        createDefaultNotificationPreferences(newUser.uid),
      ]);

      router.replace('/profile');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('email-already-in-use')) {
        setError('An account with this email already exists.');
      } else if (msg.includes('invalid-email')) {
        setError('Please enter a valid email address.');
      } else if (msg.includes('weak-password')) {
        setError('Please choose a stronger password.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell min-h-screen flex flex-col">
      {/* Back */}
      <div className="pt-6 px-4">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#6b7685] hover:text-[#1a2332]"
        >
          <ArrowLeft size={15} />
          Back to Sign In
        </Link>
      </div>

      {/* Header */}
      <div className="pt-6 pb-6 px-6">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ backgroundColor: '#d1fae5' }}
        >
          <span className="text-2xl font-extrabold text-[#065f46]">S</span>
        </div>
        <h1 className="text-[24px] font-extrabold text-[#1a2332]">Create account</h1>
        <p className="text-[13px] text-[#9ca3af] mt-1">Start your NEET journey with Sushruta</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-8">
        <form onSubmit={handleRegister} className="space-y-4" noValidate>
          {error && (
            <div className="flex items-start gap-2 px-3.5 py-3 rounded-xl bg-[#fee2e2] border border-[#fca5a5]">
              <AlertCircle size={16} className="text-[#ef4444] flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#991b1b]">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="reg-name" className="block text-sm font-medium text-[#1a2332] mb-1.5">
              Full Name
            </label>
            <input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-3 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332] bg-white"
              placeholder="Subhadip Dey"
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-[#1a2332] mb-1.5">
              Email address
            </label>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-3 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332] bg-white"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="reg-password" className="block text-sm font-medium text-[#1a2332] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-3 pr-10 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332] bg-white"
                placeholder="Min. 6 characters"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="reg-confirm" className="block text-sm font-medium text-[#1a2332] mb-1.5">
              Confirm Password
            </label>
            <input
              id="reg-confirm"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-3 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332] bg-white"
              placeholder="Re-enter password"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl text-[15px] font-semibold text-white disabled:opacity-60 press-effect mt-2"
            style={{ backgroundColor: '#10b981' }}
          >
            {submitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-[13px] text-[#9ca3af] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#10b981] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
