export class UserStatsDto {
  name: string;
  email: string;
  level: string;
  currentStreak: number;
  longestStreak: number;
  totalLessonsCompleted: number;
  totalWordsLearned: number;
  totalQuizzesCompleted: number;
  quizHighestScore: number;
  quizAverageScore: number;
  isLevelUpTestTakenToday: boolean;
}
