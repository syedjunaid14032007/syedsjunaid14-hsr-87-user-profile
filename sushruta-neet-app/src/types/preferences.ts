export interface StudyPreferences {
  dailyStudyMinutes: number;
  preferredSubjects: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  preferredStartTime: string;
  remindersEnabled: boolean;
}

export interface NotificationPreferences {
  studyReminders: boolean;
  mockTestReminders: boolean;
  dailyMotivation: boolean;
  achievementNotifications: boolean;
}

export const DEFAULT_STUDY_PREFERENCES: StudyPreferences = {
  dailyStudyMinutes: 360,
  preferredSubjects: ['Physics', 'Chemistry', 'Biology'],
  difficulty: 'medium',
  preferredStartTime: '18:00',
  remindersEnabled: true,
};

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  studyReminders: true,
  mockTestReminders: true,
  dailyMotivation: true,
  achievementNotifications: true,
};
