import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Achievement } from '../types';
import { useData } from '../context/DataContext';
import { markLessonComplete } from '../utils/storage';
import { theme } from '../utils/theme';
import CodeBlock from '../components/CodeBlock';
import AchievementNotification from '../components/AchievementNotification';

type LessonDetailRouteProp = RouteProp<RootStackParamList, 'LessonDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LessonDetail'>;

export default function LessonDetailScreen() {
  const route = useRoute<LessonDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { quizzes } = useData();
  const { lesson } = route.params;
  const [isCompleting, setIsCompleting] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      const { progress, unlockedAchievements } = await markLessonComplete(lesson.id);

      // Show achievement notification if any were unlocked
      if (unlockedAchievements.length > 0) {
        // Show the first achievement (usually only one per lesson completion)
        setCurrentAchievement(unlockedAchievements[0]);

        // Wait a bit before showing the quiz prompt
        setTimeout(() => {
          showQuizPrompt();
        }, 4500);
      } else {
        // No achievement, show quiz prompt immediately
        showQuizPrompt();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save progress');
    } finally {
      setIsCompleting(false);
    }
  };

  const showQuizPrompt = () => {
    // Check if there's a quiz for this lesson
    const quiz = quizzes.find(q => q.lessonId === lesson.id);

    if (quiz) {
      Alert.alert(
        'Lesson Complete!',
        'Great job! Ready to test your knowledge?',
        [
          {
            text: 'Later',
            style: 'cancel',
            onPress: () => navigation.goBack(),
          },
          {
            text: 'Take Quiz',
            onPress: () => navigation.navigate('Quiz', { quiz, lessonTitle: lesson.title }),
          },
        ]
      );
    } else {
      Alert.alert(
        'Lesson Complete!',
        'You earned 10 points!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  };

  const handleDismissAchievement = () => {
    setCurrentAchievement(null);
  };

  // Helper function to parse text with inline code and formatting
  const parseFormattedText = (text: string) => {
    const parts: Array<{ type: 'text' | 'code' | 'bold'; content: string }> = [];
    let currentText = text;
    let position = 0;

    // Regular expressions for different formats
    const codeRegex = /`([^`]+)`/g;
    const boldRegex = /\*\*([^*]+)\*\*/g;

    // Find all matches and their positions
    const matches: Array<{ index: number; length: number; content: string; type: 'code' | 'bold' }> = [];

    let match;
    while ((match = codeRegex.exec(text)) !== null) {
      matches.push({ index: match.index, length: match[0].length, content: match[1], type: 'code' });
    }

    while ((match = boldRegex.exec(text)) !== null) {
      matches.push({ index: match.index, length: match[0].length, content: match[1], type: 'bold' });
    }

    // Sort matches by position
    matches.sort((a, b) => a.index - b.index);

    // Build parts array
    matches.forEach((m, i) => {
      // Add text before this match
      if (m.index > position) {
        parts.push({ type: 'text', content: text.substring(position, m.index) });
      }
      // Add the match
      parts.push({ type: m.type, content: m.content });
      position = m.index + m.length;
    });

    // Add remaining text
    if (position < text.length) {
      parts.push({ type: 'text', content: text.substring(position) });
    }

    // If no matches, just return the text
    if (parts.length === 0) {
      parts.push({ type: 'text', content: text });
    }

    return parts;
  };

  const renderFormattedText = (text: string, baseStyle: any) => {
    const parts = parseFormattedText(text);

    return (
      <Text style={baseStyle}>
        {parts.map((part, i) => {
          if (part.type === 'code') {
            return (
              <Text key={i} style={styles.inlineCode}>
                {part.content}
              </Text>
            );
          } else if (part.type === 'bold') {
            return (
              <Text key={i} style={styles.boldText}>
                {part.content}
              </Text>
            );
          } else {
            return <Text key={i}>{part.content}</Text>;
          }
        })}
      </Text>
    );
  };

  const renderContent = (content: string) => {
    const sections = content.split('\n\n');

    return sections.map((section, index) => {
      // Heading 1
      if (section.startsWith('# ')) {
        const text = section.replace('# ', '');
        return (
          <View key={index} style={styles.heading1Container}>
            {renderFormattedText(text, styles.heading1)}
          </View>
        );
      }
      // Heading 2
      else if (section.startsWith('## ')) {
        const text = section.replace('## ', '');
        return (
          <View key={index} style={styles.heading2Container}>
            <View style={styles.heading2Accent} />
            {renderFormattedText(text, styles.heading2)}
          </View>
        );
      }
      // Heading 3 (### )
      else if (section.startsWith('### ')) {
        const text = section.replace('### ', '');
        return (
          <View key={index} style={styles.heading3Container}>
            <View style={styles.heading3IconWrapper}>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
            </View>
            {renderFormattedText(text, styles.heading3)}
          </View>
        );
      }
      // Heading 4 (#### )
      else if (section.startsWith('#### ')) {
        const text = section.replace('#### ', '');
        return (
          <View key={index} style={styles.heading4Container}>
            {renderFormattedText(text, styles.heading4)}
          </View>
        );
      }
      // List items
      else if (section.startsWith('- ')) {
        const items = section.split('\n');
        return (
          <View key={index} style={styles.listCard}>
            {items.map((item, i) => {
              if (!item.trim()) return null;
              const text = item.replace('- ', '');

              return (
                <View key={i} style={styles.listItem}>
                  <View style={styles.bulletContainer}>
                    <Ionicons name="checkmark-circle" size={18} color={theme.colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    {renderFormattedText(text, styles.listItemText)}
                  </View>
                </View>
              );
            })}
          </View>
        );
      }
      // Regular paragraph
      else {
        return (
          <View key={index} style={styles.paragraphCard}>
            {renderFormattedText(section, styles.paragraph)}
          </View>
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Achievement Notification */}
      <AchievementNotification
        achievement={currentAchievement}
        onDismiss={handleDismissAchievement}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{lesson.title}</Text>
          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
              <Text style={styles.metaText}>{lesson.estimatedTime} min</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Ionicons name="bar-chart-outline" size={16} color={theme.colors.textSecondary} />
              <Text style={styles.metaText}>{lesson.difficulty}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Ionicons name="folder-outline" size={16} color={theme.colors.textSecondary} />
              <Text style={styles.metaText}>{lesson.category}</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {renderContent(lesson.content)}
        </View>

        {/* Code Example */}
        {lesson.codeExample && (
          <View style={styles.codeSection}>
            <View style={styles.codeSectionHeader}>
              <Ionicons name="code-slash" size={20} color={theme.colors.primary} />
              <Text style={styles.codeSectionTitle}>Code Example</Text>
            </View>

            <CodeBlock
              code={lesson.codeExample.code}
              language={lesson.codeExample.language}
            />

            <View style={styles.explanationBox}>
              <Ionicons name="information-circle" size={20} color={theme.colors.primary} />
              <Text style={styles.explanationText}>
                {lesson.codeExample.explanation}
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleComplete}
          disabled={isCompleting}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.completeButtonText}>
            {isCompleting ? 'Completing...' : 'Mark as Complete'}
          </Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaDivider: {
    width: 1,
    height: 14,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.sm,
  },
  metaText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  content: {
    padding: theme.spacing.md,
  },
  heading1Container: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  heading1: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    lineHeight: 38,
  },
  heading2Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  heading2Accent: {
    width: 4,
    height: 24,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    marginRight: theme.spacing.sm,
  },
  heading2: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    flex: 1,
  },
  paragraphCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary + '40',
  },
  paragraph: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 24,
  },
  listCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  bulletContainer: {
    marginRight: theme.spacing.md,
    marginTop: 2,
  },
  listItemText: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  inlineCode: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: '#f0f4f8',
    color: '#e91e63',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
  heading3Container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.xs,
  },
  heading3IconWrapper: {
    paddingTop: 3,
  },
  heading3: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
    flex: 1,
    lineHeight: theme.fontSize.lg * 1.3,
  },
  heading4Container: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.md,
  },
  heading4: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
  },
  codeSection: {
    margin: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  codeSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  codeSectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  explanationBox: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary + '10',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  explanationText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 20,
    marginLeft: theme.spacing.sm,
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  completeButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: '#fff',
    marginLeft: theme.spacing.sm,
  },
});
