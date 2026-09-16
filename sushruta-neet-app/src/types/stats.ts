export interface ProfileStats {
  topicsCompleted: number;
  totalStudyMinutes: number;
  averageAccuracy: number;
  mockTestsTaken: number;
  achievements: number;
  syllabusCovered: number;
}

export const formatStudyTime = (minutes: number): string => {
  const hours = Math.round(minutes / 60);
  return `${hours} hrs`;
};

export const DEFAULT_STATS: ProfileStats = {
  topicsCompleted: 372,
  totalStudyMinutes: 8880,
  averageAccuracy: 78,
  mockTestsTaken: 32,
  achievements: 6,
  syllabusCovered: 68,
};
