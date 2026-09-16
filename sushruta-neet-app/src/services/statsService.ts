import { getDocument } from '@/lib/firebase/firestore';
import { ProfileStats, DEFAULT_STATS } from '@/types/stats';
import { db } from '@/lib/firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const getStats = async (uid: string): Promise<ProfileStats | null> => {
  return getDocument<ProfileStats>(`users/${uid}/stats/profile`);
};

export const createDefaultStats = async (uid: string): Promise<void> => {
  const ref = doc(db, `users/${uid}/stats/profile`);
  await setDoc(ref, {
    ...DEFAULT_STATS,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateStats = async (uid: string, data: Partial<ProfileStats>): Promise<void> => {
  const ref = doc(db, `users/${uid}/stats/profile`);
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
};
