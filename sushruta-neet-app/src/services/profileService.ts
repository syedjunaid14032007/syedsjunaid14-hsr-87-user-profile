import { getDocument, createDocument, updateDocument } from '@/lib/firebase/firestore';
import { UserProfile, UpdateProfilePayload } from '@/types/profile';
import { serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';

export const getProfile = async (uid: string): Promise<UserProfile | null> => {
  return getDocument<UserProfile>(`users/${uid}`);
};

export const updateProfile = async (uid: string, data: UpdateProfilePayload): Promise<void> => {
  return updateDocument(`users/${uid}`, data);
};

export const createDefaultProfile = async (
  uid: string,
  displayName: string,
  email: string
): Promise<void> => {
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const profileData: Omit<UserProfile, 'createdAt' | 'updatedAt'> = {
    displayName,
    email,
    avatarInitials: initials,
    role: 'NEET Aspirant',
    quote: 'Discipline today, Doctor tomorrow.',
    goal: {
      exam: 'NEET',
      year: 2026,
    },
    appearance: 'light',
  };

  const ref = doc(db, `users/${uid}`);
  await setDoc(ref, {
    ...profileData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
