import { Timestamp } from 'firebase/firestore';

export interface UserGoal {
  exam: string;
  year: number;
  targetScore?: number;
  targetRank?: number;
}

export interface UserProfile {
  displayName: string;
  email: string;
  avatarInitials: string;
  role: string;
  quote: string;
  goal: UserGoal;
  appearance: 'light' | 'dark' | 'system';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface UpdateProfilePayload {
  displayName?: string;
  avatarInitials?: string;
  role?: string;
  quote?: string;
  goal?: Partial<UserGoal>;
  appearance?: 'light' | 'dark' | 'system';
}
