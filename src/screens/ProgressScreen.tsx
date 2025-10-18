import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { useData } from '../context/DataContext';
import { getProgress, resetProgress } from '../utils/storage';
import { UserProgress } from '../types';
import { theme } from '../utils/theme';

export default function ProgressScreen() {
  const isFocused = useIsFocused();
  const { lessons } = useData();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    if (isFocused) {
      loadProgress();
    }
  }, [isFocused]);

  const loadProgress = async () => {
    const data = await getProgress();
    setProgress(data);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your progress? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetProgress();
            await loadProgress();
            Alert.alert('Success', 'Your progress has been reset');
          },
        },
      ]
    );
  };

  if (!progress) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading progress...</Text>
      </View>
    );
  }

  const completionPercentage = Math.round(
    (progress.completedLessons.length / lessons.length) * 100
  );
  const unlockedAchievements = progress.achievements.filter(a => a.unlocked);
  const averageQuizScore =
    Object.keys(progress.quizScores).length > 0
      ? Math.round(
          Object.values(progress.quizScores).reduce((a, b) => a + b, 0) /
            Object.keys(progress.quizScores).length
        )
      : 0;

  const getAchievementIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      rocket: 'rocket',
      fire: 'flame',
      trophy: 'trophy',
      star: 'star',
    };
    return iconMap[iconName] || 'star';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.pointsContainer}>
            <Ionicons name="star" size={32} color="#fbbf24" />
            <Text style={styles.pointsValue}>{progress.totalPoints}</Text>
          </View>
          <Text style={styles.pointsLabel}>Total Points</Text>
        </View>
      </LinearGradient>

      {/* Stats Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
              <Ionicons name="book" size={28} color={theme.colors.primary} />
            </View>
            <Text style={styles.statValue}>{progress.completedLessons.length}</Text>
            <Text style={styles.statLabel}>Lessons Completed</Text>
            <Text style={styles.statSubLabel}>of {lessons.length} total</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: theme.colors.success + '20' }]}>
              <Ionicons name="checkmark-circle" size={28} color={theme.colors.success} />
            </View>
            <Text style={styles.statValue}>{completionPercentage}%</Text>
            <Text style={styles.statLabel}>Progress</Text>
            <Text style={styles.statSubLabel}>completion rate</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: theme.colors.warning + '20' }]}>
              <Ionicons name="trophy" size={28} color={theme.colors.warning} />
            </View>
            <Text style={styles.statValue}>{unlockedAchievements.length}</Text>
            <Text style={styles.statLabel}>Achievements</Text>
            <Text style={styles.statSubLabel}>of {progress.achievements.length} total</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: theme.colors.secondary + '20' }]}>
              <Ionicons name="school" size={28} color={theme.colors.secondary} />
            </View>
            <Text style={styles.statValue}>{averageQuizScore}%</Text>
            <Text style={styles.statLabel}>Avg Quiz Score</Text>
            <Text style={styles.statSubLabel}>
              {Object.keys(progress.quizScores).length} quizzes taken
            </Text>
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.section}>
        <View style={styles.progressHeader}>
          <Text style={styles.sectionTitle}>Learning Progress</Text>
          <Text style={styles.progressPercentage}>{completionPercentage}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${completionPercentage}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {progress.completedLessons.length} of {lessons.length} lessons completed
        </Text>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsList}>
          {progress.achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                !achievement.unlocked && styles.achievementLocked,
              ]}
            >
              <View
                style={[
                  styles.achievementIcon,
                  {
                    backgroundColor: achievement.unlocked
                      ? theme.colors.warning + '20'
                      : theme.colors.textLight + '20',
                  },
                ]}
              >
                <Ionicons
                  name={getAchievementIcon(achievement.icon)}
                  size={28}
                  color={achievement.unlocked ? theme.colors.warning : theme.colors.textLight}
                />
              </View>
              <View style={styles.achievementContent}>
                <Text
                  style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.achievementTitleLocked,
                  ]}
                >
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                {achievement.unlocked && achievement.unlockedAt && (
                  <Text style={styles.achievementDate}>
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </Text>
                )}
              </View>
              {achievement.unlocked && (
                <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Quiz Scores */}
      {Object.keys(progress.quizScores).length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz Performance</Text>
          <View style={styles.quizScoresList}>
            {Object.entries(progress.quizScores).map(([lessonId, score]) => {
              const lesson = lessons.find(l => l.id === lessonId);
              return lesson ? (
                <View key={lessonId} style={styles.quizScoreCard}>
                  <View style={styles.quizScoreInfo}>
                    <Text style={styles.quizScoreTitle}>{lesson.title}</Text>
                    <Text style={styles.quizScoreCategory}>{lesson.category}</Text>
                  </View>
                  <View style={styles.quizScoreValue}>
                    <Text
                      style={[
                        styles.quizScorePercentage,
                        {
                          color:
                            score >= 80
                              ? theme.colors.success
                              : score >= 60
                              ? theme.colors.warning
                              : theme.colors.error,
                        },
                      ]}
                    >
                      {Math.round(score)}%
                    </Text>
                  </View>
                </View>
              ) : null;
            })}
          </View>
        </View>
      )}

      {/* Reset Button */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.7}
        >
          <Ionicons name="refresh" size={20} color={theme.colors.error} />
          <Text style={styles.resetButtonText}>Reset Progress</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  header: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  headerContent: {
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: theme.fontWeight.bold,
    color: '#fff',
    marginLeft: theme.spacing.md,
  },
  pointsLabel: {
    fontSize: theme.fontSize.lg,
    color: '#fff',
    opacity: 0.9,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - theme.spacing.md * 2 - theme.spacing.sm) / 2,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    alignItems: 'center',
    ...theme.shadows.md,
    minHeight: 140,
    justifyContent: 'center',
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  statValue: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    textAlign: 'center',
  },
  statSubLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  progressPercentage: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
  progressText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  achievementsList: {
    gap: theme.spacing.sm,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  achievementTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  achievementTitleLocked: {
    color: theme.colors.textSecondary,
  },
  achievementDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  achievementDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.success,
    marginTop: 4,
  },
  quizScoresList: {
    gap: theme.spacing.sm,
  },
  quizScoreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  quizScoreInfo: {
    flex: 1,
  },
  quizScoreTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  quizScoreCategory: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  quizScoreValue: {
    marginLeft: theme.spacing.md,
  },
  quizScorePercentage: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.error,
  },
  resetButtonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.error,
    marginLeft: theme.spacing.sm,
  },
});
