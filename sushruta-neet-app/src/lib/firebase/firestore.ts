import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import { db } from './config';

export const getDocument = async <T>(path: string): Promise<T | null> => {
  const ref = doc(db, path);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as T;
};

export const setDocument = async (path: string, data: DocumentData) => {
  const ref = doc(db, path);
  return setDoc(ref, { ...data, updatedAt: serverTimestamp() });
};

export const updateDocument = async (path: string, data: Partial<DocumentData>) => {
  const ref = doc(db, path);
  return updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
};

export const createDocument = async (path: string, data: DocumentData) => {
  const ref = doc(db, path);
  return setDoc(ref, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
};

export const getDocRef = (path: string): DocumentReference => doc(db, path);
