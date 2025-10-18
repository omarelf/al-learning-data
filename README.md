# JavaScript Learning App

A professional, modern, and responsive React Native education app built with Expo. This app helps users learn JavaScript from fundamentals to advanced concepts with interactive lessons, code examples, quizzes, and progress tracking.

## Features

- **Interactive Lessons**: 8 comprehensive JavaScript lessons covering:
  - Variables and Data Types
  - Functions
  - Arrays and Array Methods
  - Objects and Destructuring
  - Promises and Async/Await
  - ES6+ Features
  - Classes and OOP
  - Error Handling

- **Code Examples**: Syntax-highlighted code snippets with explanations
- **Quizzes**: Test your knowledge with multiple-choice questions
- **Progress Tracking**: Track completed lessons, quiz scores, and total points
- **Achievements**: Unlock badges as you progress
- **Modern UI**: Clean, professional design with gradient headers and smooth animations

## Tech Stack

- **React Native** with **TypeScript**
- **Expo** for easy development and deployment
- **React Navigation** for navigation (tabs and stack)
- **AsyncStorage** for persistent data storage
- **Syntax Highlighter** for code examples
- **Expo Linear Gradient** for beautiful UI elements
- **Ionicons** for icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

1. Navigate to the project directory:
```bash
cd js-learning-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## Project Structure

```
js-learning-app/
├── src/
│   ├── screens/           # All screen components
│   │   ├── HomeScreen.tsx
│   │   ├── LessonsScreen.tsx
│   │   ├── LessonDetailScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── QuizResultScreen.tsx
│   │   └── ProgressScreen.tsx
│   ├── navigation/        # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── data/             # Lesson content and quizzes
│   │   └── lessons.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── storage.ts    # AsyncStorage helpers
│   │   └── theme.ts      # Theme configuration
│   └── components/       # Reusable components (if needed)
├── App.tsx              # App entry point
└── package.json
```

## Screens

### Home Screen
- Welcome hero section with app statistics
- Quick start action
- Category cards
- Feature highlights

### Lessons Screen
- Filterable lesson list by category
- Lesson cards with difficulty badges
- Progress indicators
- Estimated time for each lesson

### Lesson Detail Screen
- Markdown-formatted lesson content
- Syntax-highlighted code examples
- Code explanations
- Mark as complete action

### Quiz Screen
- Multiple-choice questions
- Progress indicator
- Instant feedback with explanations
- Score tracking

### Quiz Result Screen
- Overall score with percentage
- Detailed statistics
- Achievement unlocks
- Encouragement messages

### Progress Screen
- Total points and statistics
- Completion percentage
- Achievements gallery
- Quiz performance history
- Reset progress option

## Creating Apps for Other Languages/Frameworks

This app is designed to be easily adaptable for other programming languages or frameworks. To create a new app:

1. **Copy the project**:
```bash
cp -r js-learning-app java-learning-app
cd java-learning-app
```

2. **Update the lessons data** in `src/data/lessons.ts`:
   - Replace the lessons array with content for your chosen language
   - Update quiz questions accordingly

3. **Update branding**:
   - Change app name in `app.json`
   - Update the hero section in `HomeScreen.tsx`
   - Modify the icon in the header (replace `logo-javascript`)

4. **Customize theme** (optional):
   - Edit colors in `src/utils/theme.ts`

## Customization

### Theme Colors
Edit `src/utils/theme.ts` to customize:
- Primary and secondary colors
- Difficulty colors
- Spacing and border radius
- Font sizes and weights
- Shadow styles

### Adding New Lessons
Add lesson objects to the `lessons` array in `src/data/lessons.ts`:

```typescript
{
  id: '9',
  title: 'Your Lesson Title',
  category: 'Category Name',
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  description: 'Brief description',
  estimatedTime: 15, // in minutes
  content: 'Markdown formatted content...',
  codeExample: {
    code: 'Your code here',
    language: 'javascript',
    explanation: 'Explanation of the code'
  }
}
```

### Adding Quizzes
Add quiz objects to the `quizzes` array in `src/data/lessons.ts`:

```typescript
{
  id: 'quiz-9',
  lessonId: '9',
  questions: [
    {
      id: 'q9-1',
      question: 'Your question?',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 0, // Index of correct option
      explanation: 'Explanation of the correct answer'
    }
  ]
}
```

## Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

### Web
```bash
npm run web
```

## Contributing

This is a template project. Feel free to fork and customize for your own educational apps!

## License

MIT License - feel free to use this project for your own learning apps.
