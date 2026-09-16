'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import { QuoteCard } from '@/components/profile/QuoteCard';
import { GoalCard } from '@/components/profile/GoalCard';
import { StatsGrid } from '@/components/profile/StatsGrid';
import { ProfileSettingsList } from '@/components/profile/ProfileSettingsList';
import { SignOutButton } from '@/components/profile/SignOutButton';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { ProfilePageSkeleton } from '@/components/ui/Skeleton';
import { Modal } from '@/components/ui/Modal';
import { ToastContainer, useToast } from '@/components/ui/Toast';
import { getProfile, updateProfile, createDefaultProfile } from '@/services/profileService';
import { getStats, createDefaultStats } from '@/services/statsService';
import { UserProfile } from '@/types/profile';
import { ProfileStats } from '@/types/stats';

interface EditProfileDraft {
  displayName: string;
  role: string;
  avatarInitials: string;
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit profile modal
  const [editOpen, setEditOpen] = useState(false);
  const [editDraft, setEditDraft] = useState<EditProfileDraft>({
    displayName: '',
    role: '',
    avatarInitials: '',
  });
  const [editSaving, setEditSaving] = useState(false);

  const { toasts, showToast, removeToast } = useToast();

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  // Fetch data
  const fetchData = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);
    setError(null);
    try {
      let [profileData, statsData] = await Promise.all([
        getProfile(user.uid),
        getStats(user.uid),
      ]);

      // Create defaults if new user
      if (!profileData) {
        await createDefaultProfile(user.uid, user.displayName || 'Subhadip Dey', user.email || '');
        profileData = await getProfile(user.uid);
      }
      if (!statsData) {
        await createDefaultStats(user.uid);
        statsData = await getStats(user.uid);
      }

      setProfile(profileData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError('Failed to load your profile. Please check your connection and try again.');
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  const handleEditOpen = () => {
    if (!profile) return;
    setEditDraft({
      displayName: profile.displayName,
      role: profile.role,
      avatarInitials: profile.avatarInitials,
    });
    setEditOpen(true);
  };

  const handleEditSave = async () => {
    if (!user || !profile) return;
    setEditSaving(true);
    try {
      await updateProfile(user.uid, {
        displayName: editDraft.displayName.trim(),
        role: editDraft.role.trim(),
        avatarInitials: editDraft.avatarInitials.trim().toUpperCase().slice(0, 2),
      });
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              displayName: editDraft.displayName.trim(),
              role: editDraft.role.trim(),
              avatarInitials: editDraft.avatarInitials.trim().toUpperCase().slice(0, 2),
            }
          : prev
      );
      setEditOpen(false);
      showToast('Profile updated!', 'success');
    } catch {
      showToast('Failed to update profile.', 'error');
    } finally {
      setEditSaving(false);
    }
  };

  // Loading state
  if (authLoading || (dataLoading && !profile)) {
    return (
      <div className="app-shell">
        <div className="bg-white border-b border-[#e8ecf0] px-4 py-3.5 flex items-center justify-center">
          <div className="skeleton w-20 h-5 rounded" />
        </div>
        <ProfilePageSkeleton />
        <BottomNavigation />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="app-shell">
        <ProfileHeader />
        <div className="flex flex-col items-center justify-center px-6 py-20 gap-4">
          <div className="w-14 h-14 rounded-full bg-[#fee2e2] flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-[15px] text-[#6b7685] text-center">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: '#10b981' }}
          >
            Try Again
          </button>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="app-shell">
      {/* Header */}
      <ProfileHeader />

      {/* Scrollable content */}
      <div className="overflow-y-auto pb-20" style={{ maxHeight: 'calc(100dvh - 52px)' }}>
        <div className="px-4 pt-4 space-y-3">
          {/* ===== PROFILE SECTION ===== */}
          <div className="flex items-center gap-3">
            <ProfileAvatar initials={profile.avatarInitials} />
            <div className="flex-1 min-w-0">
              <h2 className="text-[18px] font-bold text-primary leading-tight truncate">
                {profile.displayName}
              </h2>
              <p className="text-[13px] text-muted font-medium mt-0.5">{profile.role}</p>
            </div>
            <button
              onClick={handleEditOpen}
              className="w-9 h-9 flex items-center justify-center rounded-full edit-btn-hover text-muted hover:text-secondary flex-shrink-0 icon-bounce-hover"
              aria-label="Edit profile"
            >
              <Pencil size={17} />
            </button>
          </div>

          {/* ===== QUOTE CARD ===== */}
          <QuoteCard
            quote={profile.quote}
            uid={user!.uid}
            onUpdate={(q) => setProfile((p) => (p ? { ...p, quote: q } : p))}
            onToast={showToast}
          />

          {/* ===== GOAL CARD ===== */}
          <GoalCard
            goal={profile.goal}
            uid={user!.uid}
            onUpdate={(g) => setProfile((p) => (p ? { ...p, goal: g } : p))}
            onToast={showToast}
          />

          {/* ===== STATISTICS ===== */}
          {stats && <StatsGrid stats={stats} />}

          {/* ===== SETTINGS LIST ===== */}
          <ProfileSettingsList appearance={profile.appearance} />

          {/* ===== SIGN OUT ===== */}
          <div className="pb-2">
            <SignOutButton onToast={showToast} />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Edit Profile Modal */}
      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile" size="sm">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="edit-name"
              className="block text-sm font-medium text-[#1a2332] mb-1.5"
            >
              Full Name
            </label>
            <input
              id="edit-name"
              type="text"
              value={editDraft.displayName}
              onChange={(e) => setEditDraft((d) => ({ ...d, displayName: e.target.value }))}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332]"
              placeholder="Your full name"
              autoFocus
            />
          </div>
          <div>
            <label
              htmlFor="edit-role"
              className="block text-sm font-medium text-[#1a2332] mb-1.5"
            >
              Role / Subtitle
            </label>
            <input
              id="edit-role"
              type="text"
              value={editDraft.role}
              onChange={(e) => setEditDraft((d) => ({ ...d, role: e.target.value }))}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332]"
              placeholder="e.g. NEET Aspirant"
            />
          </div>
          <div>
            <label
              htmlFor="edit-initials"
              className="block text-sm font-medium text-[#1a2332] mb-1.5"
            >
              Avatar Initials <span className="text-[#9ca3af] font-normal">(max 2 chars)</span>
            </label>
            <input
              id="edit-initials"
              type="text"
              maxLength={2}
              value={editDraft.avatarInitials}
              onChange={(e) =>
                setEditDraft((d) => ({
                  ...d,
                  avatarInitials: e.target.value.toUpperCase().slice(0, 2),
                }))
              }
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#e8ecf0] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none text-[#1a2332] uppercase"
              placeholder="SD"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setEditOpen(false)}
              className="flex-1 py-2.5 rounded-xl border border-[#e8ecf0] text-sm font-medium text-[#6b7685] hover:bg-[#f9fafb]"
            >
              Cancel
            </button>
            <button
              onClick={handleEditSave}
              disabled={editSaving || !editDraft.displayName.trim()}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
              style={{ backgroundColor: '#10b981' }}
            >
              {editSaving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
