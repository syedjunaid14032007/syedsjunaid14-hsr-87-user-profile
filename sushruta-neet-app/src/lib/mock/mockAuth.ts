/**
 * Mock Auth — stores users in localStorage.
 * Replaces Firebase Auth for local development when NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true.
 */

export interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
}

const USERS_KEY = 'sushruta_mock_users';
const SESSION_KEY = 'sushruta_mock_session';

type MockUsersStore = Record<string, { uid: string; email: string; displayName: string; passwordHash: string }>;

function getUsers(): MockUsersStore {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveUsers(users: MockUsersStore) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function mockGetCurrentUser(): MockUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}

function setSession(user: MockUser | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export async function mockSignUp(email: string, password: string, displayName: string): Promise<MockUser> {
  const users = getUsers();
  const existing = Object.values(users).find(u => u.email === email);
  if (existing) throw new Error('auth/email-already-in-use');

  const uid = 'mock-' + Date.now() + '-' + Math.random().toString(36).slice(2);
  const user: MockUser = { uid, email, displayName, emailVerified: false };
  users[uid] = { uid, email, displayName, passwordHash: btoa(password) };
  saveUsers(users);
  setSession(user);
  return user;
}

export async function mockSignIn(email: string, password: string): Promise<MockUser> {
  const users = getUsers();
  const record = Object.values(users).find(u => u.email === email);
  if (!record) throw new Error('auth/invalid-credential');
  if (record.passwordHash !== btoa(password)) throw new Error('auth/invalid-credential');
  const user: MockUser = { uid: record.uid, email: record.email, displayName: record.displayName, emailVerified: false };
  setSession(user);
  return user;
}

export async function mockSignOut(): Promise<void> {
  setSession(null);
}

// Listeners
const listeners: Array<(user: MockUser | null) => void> = [];

export function mockOnAuthStateChanged(callback: (user: MockUser | null) => void): () => void {
  listeners.push(callback);
  // Immediately call with current user
  setTimeout(() => callback(mockGetCurrentUser()), 0);
  return () => {
    const i = listeners.indexOf(callback);
    if (i > -1) listeners.splice(i, 1);
  };
}

export function notifyListeners(user: MockUser | null) {
  listeners.forEach(fn => fn(user));
}
