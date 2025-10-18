import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../types';
import { saveQuizScore } from '../utils/storage';
import { theme } from '../utils/theme';

type QuizRouteProp = RouteProp<RootStackParamList, 'Quiz'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Quiz'>;

export default function QuizScreen() {
  const route = useRoute<QuizRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { quiz, lessonTitle } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      Alert.alert('Please select an answer', 'Choose an option to continue');
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      // Save score and navigate to results
      const { progress, unlockedAchievements } = await saveQuizScore(quiz.lessonId, score, quiz.questions.length);
      navigation.replace('QuizResult', {
        score,
        total: quiz.questions.length,
        lessonId: quiz.lessonId,
        unlockedAchievements,
      } as any);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const getOptionStyle = (index: number) => {
    if (!showExplanation) {
      return [
        styles.option,
        selectedAnswer === index && styles.optionSelected,
      ];
    }

    if (index === currentQuestion.correctAnswer) {
      return [styles.option, styles.optionCorrect];
    }

    if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
      return [styles.option, styles.optionIncorrect];
    }

    return [styles.option, styles.optionDisabled];
  };

  const getOptionIconName = (index: number) => {
    if (!showExplanation) {
      return selectedAnswer === index ? 'radio-button-on' : 'radio-button-off';
    }

    if (index === currentQuestion.correctAnswer) {
      return 'checkmark-circle';
    }

    if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
      return 'close-circle';
    }

    return 'radio-button-off';
  };

  const getOptionIconColor = (index: number) => {
    if (!showExplanation) {
      return selectedAnswer === index ? theme.colors.primary : theme.colors.textSecondary;
    }

    if (index === currentQuestion.correctAnswer) {
      return theme.colors.success;
    }

    if (selectedAnswer === index) {
      return theme.colors.error;
    }

    return theme.colors.textSecondary;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.lessonTitle}>{lessonTitle}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1} / {quiz.questions.length}
          </Text>
        </View>
      </LinearGradient>

      {/* Question */}
      <View style={styles.content}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={getOptionStyle(index)}
              onPress={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              activeOpacity={0.7}
            >
              <Ionicons
                name={getOptionIconName(index)}
                size={24}
                color={getOptionIconColor(index)}
              />
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Explanation */}
        {showExplanation && (
          <View
            style={[
              styles.explanationContainer,
              selectedAnswer === currentQuestion.correctAnswer
                ? styles.explanationCorrect
                : styles.explanationIncorrect,
            ]}
          >
            <View style={styles.explanationHeader}>
              <Ionicons
                name={
                  selectedAnswer === currentQuestion.correctAnswer
                    ? 'checkmark-circle'
                    : 'close-circle'
                }
                size={24}
                color={
                  selectedAnswer === currentQuestion.correctAnswer
                    ? theme.colors.success
                    : theme.colors.error
                }
              />
              <Text
                style={[
                  styles.explanationTitle,
                  {
                    color:
                      selectedAnswer === currentQuestion.correctAnswer
                        ? theme.colors.success
                        : theme.colors.error,
                  },
                ]}
              >
                {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
              </Text>
            </View>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        )}
      </View>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        {!showExplanation ? (
          <TouchableOpacity
            style={[
              styles.submitButton,
              selectedAnswer === null && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={selectedAnswer === null}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Submit Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>
              {isLastQuestion ? 'View Results' : 'Next Question'}
            </Text>
            <Ionicons
              name={isLastQuestion ? 'checkmark' : 'arrow-forward'}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        )}
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
    padding: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  lessonTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: '#fff',
    marginBottom: theme.spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginRight: theme.spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.full,
  },
  progressText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: '#fff',
    minWidth: 50,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  questionContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  questionText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: theme.spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
  },
  optionCorrect: {
    borderColor: theme.colors.success,
    backgroundColor: theme.colors.success + '10',
  },
  optionIncorrect: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.error + '10',
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionText: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
    lineHeight: 22,
  },
  explanationContainer: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 4,
  },
  explanationCorrect: {
    backgroundColor: theme.colors.success + '10',
    borderLeftColor: theme.colors.success,
  },
  explanationIncorrect: {
    backgroundColor: theme.colors.error + '10',
    borderLeftColor: theme.colors.error,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  explanationTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    marginLeft: theme.spacing.sm,
  },
  explanationText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 20,
  },
  bottomAction: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: '#fff',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.success,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: '#fff',
    marginRight: theme.spacing.sm,
  },
});
