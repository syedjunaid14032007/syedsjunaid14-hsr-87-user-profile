import { getDocument } from '@/lib/firebase/firestore';
import {
  StudyPreferences,
  NotificationPreferences,
  DEFAULT_STUDY_PREFERENCES,
  DEFAULT_NOTIFICATION_PREFERENCES,
} from '@/types/preferences';
import { db } from '@/lib/firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Study Preferences
export const getStudyPreferences = async (uid: string): Promise<StudyPreferences | null> => {
  return getDocument<StudyPreferences>(`users/${uid}/preferences/study`);
};

export const updateStudyPreferences = async (
  uid: string,
  data: Partial<StudyPreferences>
): Promise<void> => {
  const ref = doc(db, `users/${uid}/preferences/study`);
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
};

export const createDefaultStudyPreferences = async (uid: string): Promise<void> => {
  const ref = doc(db, `users/${uid}/preferences/study`);
  await setDoc(ref, {
    ...DEFAULT_STUDY_PREFERENCES,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// Notification Preferences
export const getNotificationPreferences = async (
  uid: string
): Promise<NotificationPreferences | null> => {
  return getDocument<NotificationPreferences>(`users/${uid}/preferences/notifications`);
};

export const updateNotificationPreferences = async (
  uid: string,
  data: Partial<NotificationPreferences>
): Promise<void> => {
  const ref = doc(db, `users/${uid}/preferences/notifications`);
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
};

export const createDefaultNotificationPreferences = async (uid: string): Promise<void> => {
  const ref = doc(db, `users/${uid}/preferences/notifications`);
  await setDoc(ref, {
    ...DEFAULT_NOTIFICATION_PREFERENCES,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
