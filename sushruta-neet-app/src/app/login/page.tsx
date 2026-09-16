'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { signInWithEmail, signInWithGoogle } from '@/lib/firebase/auth';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && user) router.replace('/profile');
  }, [user, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setError('');
    setSubmitting(true);
    try {
      await signInWithEmail(email, password);
      router.replace('/profile');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      if (msg.includes('invalid-credential') || msg.includes('user-not-found') || msg.includes('wrong-password')) {
        setError('Invalid email or password. Please try again.');
      } else if (msg.includes('too-many-requests')) {
        setError('Too many attempts. Please try again later.');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setSubmitting(true);
    try {
      await signInWithGoogle();
      router.replace('/profile');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (!msg.includes('popup-closed-by-user')) {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell min-h-screen flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-8 px-6 flex flex-col items-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ backgroundColor: '#d1fae5' }}
        >
          <span className="text-3xl font-extrabold text-[#065f46]">S</span>
        </div>
        <h1 className="text-[26px] font-extrabold text-[#1a2332]">Welcome back</h1>
        <p className="text-[14px] text-[#9ca3af] mt-1">Sign in to Sushruta</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-8">
        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          {/* Error banner */}
          {error && (
            <div className="flex items-start gap-2 px-3.5 py-3 rounded-xl bg-[#fee2e2] border border-[#fca5a5]">
              <AlertCircle size={16} className="text-[#ef4444] flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#991b1b]">{error}</p>
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-[#1a2332] mb-1.5">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-3 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332] bg-white"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-[#1a2332] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-3 pr-10 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332] bg-white"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7685]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl text-[15px] font-semibold text-white disabled:opacity-60 press-effect"
            style={{ backgroundColor: '#10b981' }}
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#e8ecf0]" />
            <span className="text-[12px] text-[#9ca3af]">or continue with</span>
            <div className="flex-1 h-px bg-[#e8ecf0]" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl border border-[#e8ecf0] text-[14px] font-medium text-[#1a2332] bg-white hover:bg-[#f9fafb] disabled:opacity-60 press-effect"
          >
            {/* Google icon SVG */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.96L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-[13px] text-[#9ca3af] mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#10b981] font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
