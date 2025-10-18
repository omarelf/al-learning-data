import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '../types';
import { useData } from '../context/DataContext';
import { getProgress } from '../utils/storage';
import { theme } from '../utils/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type LessonsRouteProp = RouteProp<TabParamList, 'Lessons'>;

export default function LessonsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<LessonsRouteProp>();
  const isFocused = useIsFocused();
  const { lessons } = useData();
  const categoryScrollRef = useRef<ScrollView>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    if (isFocused) {
      loadProgress();
      // Set category from route params if provided
      if (route.params?.category) {
        setSelectedCategory(route.params.category);
        scrollToCategory(route.params.category);
      }
    }
  }, [isFocused, route.params?.category]);

  const loadProgress = async () => {
    const progress = await getProgress();
    setCompletedLessons(progress.completedLessons);
  };

  const categories = ['All', ...new Set(lessons.map(l => l.category))];

  const scrollToCategory = (category: string) => {
    const index = categories.indexOf(category);
    if (index > 0 && categoryScrollRef.current) {
      // Calculate approximate position - each chip is about 100px wide
      const scrollPosition = index * 110;
      setTimeout(() => {
        categoryScrollRef.current?.scrollTo({
          x: scrollPosition,
          animated: true
        });
      }, 100);
    }
  };

  const filteredLessons = selectedCategory === 'All'
    ? lessons
    : lessons.filter(l => l.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return theme.colors.beginner;
      case 'Intermediate': return theme.colors.intermediate;
      case 'Advanced': return theme.colors.advanced;
      default: return theme.colors.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      {/* Category Filter */}
      <ScrollView
        ref={categoryScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lessons List */}
      <ScrollView
        style={styles.lessonsList}
        contentContainerStyle={styles.lessonsListContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredLessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);

          return (
            <TouchableOpacity
              key={lesson.id}
              style={styles.lessonCard}
              onPress={() => navigation.navigate('LessonDetail', { lesson })}
              activeOpacity={0.7}
            >
              <View style={styles.lessonHeader}>
                <View style={styles.lessonHeaderLeft}>
                  <View
                    style={[
                      styles.lessonIconContainer,
                      { backgroundColor: getDifficultyColor(lesson.difficulty) + '20' },
                    ]}
                  >
                    <Ionicons
                      name={isCompleted ? 'checkmark-circle' : 'book-outline'}
                      size={24}
                      color={isCompleted ? theme.colors.success : getDifficultyColor(lesson.difficulty)}
                    />
                  </View>
                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle} numberOfLines={1}>
                      {lesson.title}
                    </Text>
                    <Text style={styles.lessonCategory}>{lesson.category}</Text>
                  </View>
                </View>
                {isCompleted && (
                  <View style={styles.completedBadge}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                )}
              </View>

              <Text style={styles.lessonDescription} numberOfLines={2}>
                {lesson.description}
              </Text>

              <View style={styles.lessonFooter}>
                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(lesson.difficulty) + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(lesson.difficulty) },
                    ]}
                  >
                    {lesson.difficulty}
                  </Text>
                </View>
                <View style={styles.timeContainer}>
                  <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.timeText}>{lesson.estimatedTime} min</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  categoriesContainer: {
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  categoriesContent: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  categoryChip: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm + 2,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
    marginRight: theme.spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 80,
    alignItems: 'center',
  },
  categoryChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    ...theme.shadows.sm,
  },
  categoryChipText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  categoryChipTextActive: {
    color: '#fff',
    fontWeight: theme.fontWeight.bold,
  },
  lessonsList: {
    flex: 1,
  },
  lessonsListContent: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  lessonCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  lessonHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonIconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  lessonTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  lessonCategory: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  completedBadge: {
    width: 28,
    height: 28,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  lessonFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  difficultyBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  difficultyText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
});
