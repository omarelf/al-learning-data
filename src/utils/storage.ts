import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, Achievement } from '../types';

const PROGRESS_KEY = '@user_progress';

const defaultProgress: UserProgress = {
  completedLessons: [],
  quizScores: {},
  totalPoints: 0,
  achievements: [
    {
      id: 'first_lesson',
      title: 'Getting Started',
      description: 'Complete your first lesson',
      icon: 'rocket',
      unlocked: false
    },
    {
      id: 'five_lessons',
      title: 'On a Roll',
      description: 'Complete 5 lessons',
      icon: 'fire',
      unlocked: false
    },
    {
      id: 'quiz_master',
      title: 'Quiz Master',
      description: 'Score 100% on any quiz',
      icon: 'trophy',
      unlocked: false
    },
    {
      id: 'dedicated',
      title: 'Dedicated Learner',
      description: 'Complete all lessons',
      icon: 'star',
      unlocked: false
    }
  ]
};

export const getProgress = async (): Promise<UserProgress> => {
  try {
    const data = await AsyncStorage.getItem(PROGRESS_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return defaultProgress;
  } catch (error) {
    console.error('Error loading progress:', error);
    return defaultProgress;
  }
};

export const saveProgress = async (progress: UserProgress): Promise<void> => {
  try {
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const markLessonComplete = async (lessonId: string): Promise<{ progress: UserProgress; unlockedAchievements: Achievement[] }> => {
  const progress = await getProgress();
  const unlockedAchievements: Achievement[] = [];

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.totalPoints += 10;

    // Check for achievements
    if (progress.completedLessons.length === 1) {
      const achievement = unlockAchievement(progress, 'first_lesson');
      if (achievement) unlockedAchievements.push(achievement);
    }
    if (progress.completedLessons.length === 5) {
      const achievement = unlockAchievement(progress, 'five_lessons');
      if (achievement) unlockedAchievements.push(achievement);
    }
    if (progress.completedLessons.length === 15) { // Total lessons
      const achievement = unlockAchievement(progress, 'dedicated');
      if (achievement) unlockedAchievements.push(achievement);
    }

    await saveProgress(progress);
  }

  return { progress, unlockedAchievements };
};

export const saveQuizScore = async (lessonId: string, score: number, total: number): Promise<{ progress: UserProgress; unlockedAchievements: Achievement[] }> => {
  const progress = await getProgress();
  const percentage = (score / total) * 100;
  const unlockedAchievements: Achievement[] = [];

  // Only add points if this is the first time taking the quiz or if the new score is higher
  const previousScore = progress.quizScores[lessonId];
  const isFirstAttempt = previousScore === undefined;
  const isHigherScore = previousScore !== undefined && percentage > previousScore;

  if (isFirstAttempt) {
    // First attempt: award full points
    progress.totalPoints += score * 5;
  } else if (isHigherScore) {
    // Higher score: award the difference
    const previousPoints = Math.round((previousScore / 100) * total) * 5;
    const newPoints = score * 5;
    progress.totalPoints += (newPoints - previousPoints);
  }

  progress.quizScores[lessonId] = percentage;

  // Check for perfect score achievement
  if (percentage === 100) {
    const achievement = unlockAchievement(progress, 'quiz_master');
    if (achievement) unlockedAchievements.push(achievement);
  }

  await saveProgress(progress);
  return { progress, unlockedAchievements };
};

const unlockAchievement = (progress: UserProgress, achievementId: string): Achievement | null => {
  const achievement = progress.achievements.find(a => a.id === achievementId);
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true;
    achievement.unlockedAt = new Date().toISOString();
    progress.totalPoints += 50; // Bonus points for achievement
    return achievement;
  }
  return null;
};

export const resetProgress = async (): Promise<void> => {
  await AsyncStorage.removeItem(PROGRESS_KEY);
};
