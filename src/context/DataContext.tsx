import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lesson, Quiz } from '../types';
import { fetchLessons, fetchQuizzes, refreshData } from '../services/api';

interface DataContextType {
  lessons: Lesson[];
  quizzes: Quiz[];
  loading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [lessonsData, quizzesData] = await Promise.all([
        fetchLessons(),
        fetchQuizzes(),
      ]);

      setLessons(lessonsData);
      setQuizzes(quizzesData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMessage);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const { lessons: freshLessons, quizzes: freshQuizzes } = await refreshData();

      setLessons(freshLessons);
      setQuizzes(freshQuizzes);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh data';
      setError(errorMessage);
      console.error('Error refreshing data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const value: DataContextType = {
    lessons,
    quizzes,
    loading,
    error,
    refreshContent,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
