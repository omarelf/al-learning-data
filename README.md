# AL Easy Learning - Data Repository

This repository hosts the lesson and quiz data for the AL Easy Learning mobile app.

## Contents

- `data/lessons.json` - All 15 JavaScript lessons with content, code examples, and explanations
- `data/quizzes.json` - Quiz questions for each lesson (75 questions total)

## Data Structure

### Lessons (103.81 KB)
- 15 comprehensive JavaScript lessons
- Covers topics from fundamentals to advanced concepts
- Each lesson includes:
  - Title, description, and difficulty level
  - Category and estimated completion time
  - Detailed content with markdown formatting
  - Code examples with explanations

### Quizzes (35.34 KB)
- 15 quizzes, one for each lesson
- 5 questions per quiz (75 questions total)
- Each question includes:
  - Multiple choice options
  - Correct answer
  - Detailed explanation

## Usage

The app fetches this data via GitHub Pages:

```
https://YOUR-USERNAME.github.io/al-learning-data/data/lessons.json
https://YOUR-USERNAME.github.io/al-learning-data/data/quizzes.json
```

The data is:
- Cached locally for 24 hours
- Automatically refreshed when cache expires
- Falls back to bundled data if network fails

## Updating Content

To update the lessons or quizzes:

1. Edit the data in the main app repository
2. Run `node scripts/convert-to-json-v2.js`
3. Copy the new JSON files to this repository
4. Commit and push changes
5. App users will get the updates after their cache expires (or manual refresh)

## Benefits

- App size reduced from ~5MB to ~500KB
- Update content without releasing new app versions
- Better performance with 24-hour caching
- Offline support with cached data

## License

Content created for AL Easy Learning educational app.

---

Last updated: ${new Date().toLocaleDateString()}
