import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lesson, Quiz } from '../types';

// Configuration
const API_BASE_URL = 'https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/data';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const CACHE_KEYS = {
  LESSONS: 'cached_lessons',
  LESSONS_TIMESTAMP: 'cached_lessons_timestamp',
  QUIZZES: 'cached_quizzes',
  QUIZZES_TIMESTAMP: 'cached_quizzes_timestamp',
};

// Fallback data (minimal set for offline use)
import { lessons as fallbackLessons, quizzes as fallbackQuizzes } from '../data/lessons';

interface CacheData<T> {
  data: T;
  timestamp: number;
}

/**
 * Check if cached data is still valid
 */
const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};

/**
 * Get data from cache
 */
const getFromCache = async <T>(key: string, timestampKey: string): Promise<T | null> => {
  try {
    const [dataStr, timestampStr] = await Promise.all([
      AsyncStorage.getItem(key),
      AsyncStorage.getItem(timestampKey),
    ]);

    if (!dataStr || !timestampStr) {
      return null;
    }

    const timestamp = parseInt(timestampStr, 10);

    if (!isCacheValid(timestamp)) {
      // Cache expired
      await AsyncStorage.multiRemove([key, timestampKey]);
      return null;
    }

    return JSON.parse(dataStr) as T;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

/**
 * Save data to cache
 */
const saveToCache = async <T>(key: string, timestampKey: string, data: T): Promise<void> => {
  try {
    await AsyncStorage.multiSet([
      [key, JSON.stringify(data)],
      [timestampKey, Date.now().toString()],
    ]);
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

/**
 * Fetch lessons from API
 */
export const fetchLessons = async (): Promise<Lesson[]> => {
  try {
    // Check cache first
    const cachedLessons = await getFromCache<Lesson[]>(
      CACHE_KEYS.LESSONS,
      CACHE_KEYS.LESSONS_TIMESTAMP
    );

    if (cachedLessons) {
      console.log('Using cached lessons');
      return cachedLessons;
    }

    // Fetch from API
    console.log('Fetching lessons from API...');
    const response = await fetch(`${API_BASE_URL}/lessons.json`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const lessons: Lesson[] = await response.json();

    // Save to cache
    await saveToCache(CACHE_KEYS.LESSONS, CACHE_KEYS.LESSONS_TIMESTAMP, lessons);

    return lessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    console.log('Using fallback lessons data');

    // Return fallback data
    return fallbackLessons;
  }
};

/**
 * Fetch quizzes from API
 */
export const fetchQuizzes = async (): Promise<Quiz[]> => {
  try {
    // Check cache first
    const cachedQuizzes = await getFromCache<Quiz[]>(
      CACHE_KEYS.QUIZZES,
      CACHE_KEYS.QUIZZES_TIMESTAMP
    );

    if (cachedQuizzes) {
      console.log('Using cached quizzes');
      return cachedQuizzes;
    }

    // Fetch from API
    console.log('Fetching quizzes from API...');
    const response = await fetch(`${API_BASE_URL}/quizzes.json`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const quizzes: Quiz[] = await response.json();

    // Save to cache
    await saveToCache(CACHE_KEYS.QUIZZES, CACHE_KEYS.QUIZZES_TIMESTAMP, quizzes);

    return quizzes;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    console.log('Using fallback quizzes data');

    // Return fallback data
    return fallbackQuizzes;
  }
};

/**
 * Force refresh data from API (ignore cache)
 */
export const refreshData = async (): Promise<{ lessons: Lesson[]; quizzes: Quiz[] }> => {
  try {
    // Clear cache
    await AsyncStorage.multiRemove([
      CACHE_KEYS.LESSONS,
      CACHE_KEYS.LESSONS_TIMESTAMP,
      CACHE_KEYS.QUIZZES,
      CACHE_KEYS.QUIZZES_TIMESTAMP,
    ]);

    // Fetch fresh data
    const [lessons, quizzes] = await Promise.all([
      fetchLessons(),
      fetchQuizzes(),
    ]);

    return { lessons, quizzes };
  } catch (error) {
    console.error('Error refreshing data:', error);
    throw error;
  }
};

/**
 * Clear all cached data
 */
export const clearCache = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      CACHE_KEYS.LESSONS,
      CACHE_KEYS.LESSONS_TIMESTAMP,
      CACHE_KEYS.QUIZZES,
      CACHE_KEYS.QUIZZES_TIMESTAMP,
    ]);
    console.log('Cache cleared successfully');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Get cache status
 */
export const getCacheStatus = async () => {
  try {
    const [lessonsTimestamp, quizzesTimestamp] = await Promise.all([
      AsyncStorage.getItem(CACHE_KEYS.LESSONS_TIMESTAMP),
      AsyncStorage.getItem(CACHE_KEYS.QUIZZES_TIMESTAMP),
    ]);

    return {
      lessons: {
        cached: !!lessonsTimestamp,
        timestamp: lessonsTimestamp ? parseInt(lessonsTimestamp, 10) : null,
        valid: lessonsTimestamp ? isCacheValid(parseInt(lessonsTimestamp, 10)) : false,
      },
      quizzes: {
        cached: !!quizzesTimestamp,
        timestamp: quizzesTimestamp ? parseInt(quizzesTimestamp, 10) : null,
        valid: quizzesTimestamp ? isCacheValid(parseInt(quizzesTimestamp, 10)) : false,
      },
    };
  } catch (error) {
    console.error('Error getting cache status:', error);
    return null;
  }
};
