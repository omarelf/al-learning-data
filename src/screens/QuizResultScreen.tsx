import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, Achievement } from '../types';
import { theme } from '../utils/theme';
import AchievementNotification from '../components/AchievementNotification';

type QuizResultRouteProp = RouteProp<RootStackParamList, 'QuizResult'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuizResult'>;

export default function QuizResultScreen() {
  const route = useRoute<QuizResultRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { score, total, unlockedAchievements } = route.params;
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);

  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    // Show achievement notification if any were unlocked
    if (unlockedAchievements && unlockedAchievements.length > 0) {
      setCurrentAchievement(unlockedAchievements[0]);
    }
  }, [unlockedAchievements]);

  const getResultMessage = () => {
    if (percentage === 100) return 'Perfect Score!';
    if (percentage >= 80) return 'Excellent Work!';
    if (percentage >= 60) return 'Good Job!';
    if (percentage >= 40) return 'Keep Practicing!';
    return 'Keep Learning!';
  };

  const getResultIcon = () => {
    if (percentage === 100) return 'trophy';
    if (percentage >= 80) return 'star';
    if (percentage >= 60) return 'thumbs-up';
    return 'refresh';
  };

  const getResultColor = () => {
    if (percentage >= 80) return theme.colors.success;
    if (percentage >= 60) return theme.colors.warning;
    return theme.colors.error;
  };

  const handleGoHome = () => {
    navigation.navigate('MainTabs');
  };

  const handleViewProgress = () => {
    navigation.navigate('MainTabs', { screen: 'Progress' } as any);
  };

  const handleDismissAchievement = () => {
    setCurrentAchievement(null);
  };

  return (
    <View style={styles.container}>
      {/* Achievement Notification */}
      <AchievementNotification
        achievement={currentAchievement}
        onDismiss={handleDismissAchievement}
      />

      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={getResultIcon()} size={80} color="#fff" />
        </View>
        <Text style={styles.message}>{getResultMessage()}</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Score Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>Your Score</Text>
          <View style={styles.scoreCircle}>
            <Text style={[styles.scorePercentage, { color: getResultColor() }]}>
              {percentage}%
            </Text>
            <Text style={styles.scoreDetail}>
              {score} out of {total} correct
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: theme.colors.success + '20' }]}>
              <Ionicons name="checkmark" size={24} color={theme.colors.success} />
            </View>
            <Text style={styles.statValue}>{score}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: theme.colors.error + '20' }]}>
              <Ionicons name="close" size={24} color={theme.colors.error} />
            </View>
            <Text style={styles.statValue}>{total - score}</Text>
            <Text style={styles.statLabel}>Incorrect</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: theme.colors.warning + '20' }]}>
              <Ionicons name="star" size={24} color={theme.colors.warning} />
            </View>
            <Text style={styles.statValue}>{score * 5}</Text>
            <Text style={styles.statLabel}>Points Earned</Text>
          </View>
        </View>

        {/* Encouragement */}
        <View style={styles.encouragementBox}>
          <Ionicons name="bulb" size={24} color={theme.colors.primary} />
          <Text style={styles.encouragementText}>
            {percentage >= 80
              ? 'Outstanding! You have a solid understanding of this topic.'
              : percentage >= 60
              ? 'Good progress! Review the lesson to improve your score.'
              : 'Keep learning! Practice makes perfect.'}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleViewProgress}
          activeOpacity={0.7}
        >
          <Ionicons name="stats-chart" size={20} color={theme.colors.primary} />
          <Text style={styles.secondaryButtonText}>View Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleGoHome}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Continue Learning</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    alignItems: 'center',
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  message: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  scoreCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  scoreTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  scoreCircle: {
    alignItems: 'center',
  },
  scorePercentage: {
    fontSize: 64,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  },
  scoreDetail: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
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
    color: theme.colors.textSecondary,
  },
  encouragementBox: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary + '10',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  encouragementText: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
    lineHeight: 22,
  },
  actions: {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: '#fff',
    marginRight: theme.spacing.sm,
  },
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.primary,
    marginLeft: theme.spacing.sm,
  },
});
