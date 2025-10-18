export interface Lesson {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  content: string;
  codeExample?: CodeExample;
  estimatedTime: number; // in minutes
}

export interface CodeExample {
  code: string;
  language: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  completedLessons: string[];
  quizScores: { [lessonId: string]: number };
  totalPoints: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  LessonDetail: { lesson: Lesson };
  Quiz: { quiz: Quiz; lessonTitle: string };
  QuizResult: { score: number; total: number; lessonId: string; unlockedAchievements?: Achievement[] };
};

export type TabParamList = {
  Home: undefined;
  Lessons: { category?: string } | undefined;
  Progress: undefined;
};
