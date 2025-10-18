import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useData } from '../context/DataContext';
import { getProgress } from '../utils/storage';
import { theme } from '../utils/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const { lessons } = useData();
  const [completedCount, setCompletedCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (isFocused) {
      loadProgress();
    }
  }, [isFocused]);

  const loadProgress = async () => {
    const progress = await getProgress();
    setCompletedCount(progress.completedLessons.length);
    setTotalPoints(progress.totalPoints);
  };

  const categories = [
    { name: 'Fundamentals', icon: 'cube', color: theme.colors.primary, count: 2 },
    { name: 'Data Structures', icon: 'grid', color: theme.colors.secondary, count: 2 },
    { name: 'Asynchronous', icon: 'time', color: '#ec4899', count: 1 },
    { name: 'Modern JavaScript', icon: 'flash', color: '#f59e0b', count: 2 },
    { name: 'Object-Oriented', icon: 'shapes', color: '#10b981', count: 1 },
    { name: 'Best Practices', icon: 'checkmark-circle', color: '#06b6d4', count: 2 },
    { name: 'Advanced Concepts', icon: 'rocket', color: '#8b5cf6', count: 2 },
    { name: 'Web Development', icon: 'globe', color: '#14b8a6', count: 3 },
  ];

  const navigateToLessons = (category?: string) => {
    navigation.navigate('MainTabs', {
      screen: 'Lessons',
      params: category ? { category } : undefined
    } as any);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.heroContent}>
          <Ionicons name="logo-javascript" size={60} color="#fff" />
          <Text style={styles.heroTitle}>Master JavaScript</Text>
          <Text style={styles.heroSubtitle}>
            Learn modern JavaScript from basics to advanced concepts
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{lessons.length}</Text>
              <Text style={styles.statLabel}>Lessons</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completedCount}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalPoints}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Start</Text>
        <TouchableOpacity style={styles.quickAction} onPress={() => navigateToLessons()}>
          <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.primary + '20' }]}>
            <Ionicons name="play-circle" size={32} color={theme.colors.primary} />
          </View>
          <View style={styles.quickActionContent}>
            <Text style={styles.quickActionTitle}>Continue Learning</Text>
            <Text style={styles.quickActionSubtitle}>
              {completedCount === lessons.length
                ? 'You\'ve completed all lessons!'
                : `${lessons.length - completedCount} lessons remaining`}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => navigateToLessons(category.name)}
              activeOpacity={0.7}
            >
              <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                <Ionicons name={category.icon as any} size={28} color={category.color} />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryCount}>{category.count} lessons</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Features */}
      <View style={[styles.section, { marginBottom: 32 }]}>
        <Text style={styles.sectionTitle}>What You'll Learn</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Ionicons name="code-slash" size={24} color={theme.colors.primary} />
            <Text style={styles.featureText}>Interactive code examples with syntax highlighting</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="help-circle" size={24} color={theme.colors.secondary} />
            <Text style={styles.featureText}>Test your knowledge with quizzes</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="trophy" size={24} color={theme.colors.warning} />
            <Text style={styles.featureText}>Track progress and earn achievements</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="rocket" size={24} color={theme.colors.success} />
            <Text style={styles.featureText}>Learn at your own pace</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  hero: {
    padding: theme.spacing.xl,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: '#fff',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  heroSubtitle: {
    fontSize: theme.fontSize.md,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: theme.spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: theme.spacing.md,
  },
  statValue: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: '#fff',
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    color: '#fff',
    opacity: 0.8,
    marginTop: theme.spacing.xs,
  },
  section: {
    padding: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  quickActionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  quickActionSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.xs,
  },
  categoryCard: {
    width: (width - theme.spacing.md * 2 - theme.spacing.xs * 4) / 2,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    margin: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  categoryName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  featuresList: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  featureText: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
});
