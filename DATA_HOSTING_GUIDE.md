# 📡 Data Hosting Guide - AL Easy Learning

## Overview

This guide explains how to host your app's lessons and quizzes data online to reduce app size and enable easy content updates.

## ✅ Benefits

- **Smaller App Size**: Reduce app bundle size from ~5MB to ~500KB
- **Easy Updates**: Update lessons without releasing new app versions
- **Better Performance**: Data is cached locally for 24 hours
- **Offline Support**: App works offline with cached data
- **Fallback Protection**: Uses bundled data if internet fails

## 🚀 Quick Start (3 Easy Options)

### Option 1: GitHub Pages (FREE & RECOMMENDED)

**Step 1:** Create a new GitHub repository
```bash
# In your terminal
cd /Users/l1k2/Desktop
mkdir al-learning-data
cd al-learning-data
git init
```

**Step 2:** Create the data structure
```bash
mkdir data
# Copy lessons.json and quizzes.json to data folder
```

**Step 3:** Push to GitHub
```bash
git add .
git commit -m "Add learning data"
git remote add origin https://github.com/YOUR-USERNAME/al-learning-data.git
git push -u origin main
```

**Step 4:** Enable GitHub Pages
1. Go to repository Settings
2. Click "Pages" in sidebar
3. Select "main" branch
4. Click Save

**Step 5:** Your data URL will be:
```
https://YOUR-USERNAME.github.io/al-learning-data/data
```

### Option 2: Vercel (FREE & INSTANT)

**Step 1:** Create `vercel.json` in your data folder:
```json
{
  "headers": [
    {
      "source": "/data/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

**Step 2:** Deploy
```bash
npx vercel
```

**Step 3:** Your URL: `https://your-project.vercel.app/data`

### Option 3: Firebase Hosting (FREE)

**Step 1:** Install Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

**Step 2:** Initialize
```bash
cd public
firebase init hosting
```

**Step 3:** Deploy
```bash
firebase deploy --only hosting
```

## 📝 Implementation Steps

### 1. Install Required Package

```bash
cd /Users/l1k2/Desktop/js-learning-app
npm install @react-native-async-storage/async-storage
```

### 2. Update API Configuration

Edit `src/services/api.ts` line 4:

```typescript
const API_BASE_URL = 'https://YOUR-ACTUAL-URL/data';
```

Replace with your hosting URL from above.

### 3. Wrap Your App with DataProvider

Edit `App.tsx`:

```typescript
import { DataProvider } from './src/context/DataContext';

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        {/* Your app content */}
      </NavigationContainer>
    </DataProvider>
  );
}
```

### 4. Use Data in Your Screens

Example:

```typescript
import { useData } from '../context/DataContext';

export default function LessonsScreen() {
  const { lessons, loading, error } = useData();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <View>
      {lessons.map(lesson => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </View>
  );
}
```

## 📦 Data File Structure

### lessons.json
```json
[
  {
    "id": "1",
    "title": "Variables and Data Types",
    "category": "Fundamentals",
    "difficulty": "Beginner",
    "description": "...",
    "content": "...",
    "codeExample": { ... },
    "estimatedTime": 15
  },
  ...
]
```

### quizzes.json
```json
[
  {
    "id": "quiz-1",
    "lessonId": "1",
    "questions": [
      {
        "id": "q1-1",
        "question": "...",
        "options": [...],
        "correctAnswer": 2,
        "explanation": "..."
      },
      ...
    ]
  },
  ...
]
```

## 🔧 Advanced Features

### Manual Refresh

Add a refresh button in your app:

```typescript
const { refreshContent } = useData();

<Button title="Refresh Content" onPress={refreshContent} />
```

### Cache Management

Clear cache programmatically:

```typescript
import { clearCache, getCacheStatus } from '../services/api';

// Clear all cached data
await clearCache();

// Check cache status
const status = await getCacheStatus();
console.log(status);
```

### Cache Duration

Modify cache duration in `src/services/api.ts`:

```typescript
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours (default)
// Change to:
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days
```

## 🎯 Testing

### Test with Local Server

```bash
# Install http-server
npm install -g http-server

# Serve your public folder
cd /Users/l1k2/Desktop/js-learning-app/public
http-server --cors

# Update API_BASE_URL to http://YOUR-IP:8080/data
```

### Test Offline Mode

1. Turn on Airplane Mode
2. Open your app
3. Should load from cache or fallback data

### Test Cache Refresh

1. Update data files on server
2. Open app (uses cached data)
3. Press refresh button (fetches new data)
4. Or wait 24 hours (auto-refresh)

## 📊 Monitoring

Add analytics to track data loading:

```typescript
import * as Analytics from 'expo-analytics';

// Track data source
Analytics.logEvent('data_loaded', {
  source: cachedData ? 'cache' : 'network',
  timestamp: new Date().toISOString(),
});
```

## 🐛 Troubleshooting

### CORS Errors

If you get CORS errors, add headers to your hosting:

**GitHub Pages**: Use a CORS proxy
```typescript
const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/https://your-url/data';
```

**Vercel/Netlify**: Add to config (shown in Option 2 above)

### Network Timeout

Increase timeout in api.ts:

```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 10000); // 10 seconds

fetch(url, { signal: controller.signal })
```

### Large JSON Files

Compress your JSON:

```bash
# Install gzip
gzip lessons.json
gzip quizzes.json

# Upload .gz files
# Update fetch to handle compressed responses
```

## 📈 Performance Tips

1. **Minimize JSON Size**: Remove unnecessary whitespace
2. **Use CDN**: Host on Cloudflare, Amazon CloudFront
3. **Enable Compression**: Gzip/Brotli on server
4. **Pagination**: Split large datasets
5. **Lazy Loading**: Load lesson content only when needed

## 🔄 Update Workflow

1. Edit lessons in `src/data/lessons.ts`
2. Export to JSON files
3. Upload to hosting
4. Users get new content automatically (after cache expires or manual refresh)

## 💡 Next Steps

1. ✅ Set up hosting (choose one option above)
2. ✅ Install AsyncStorage package
3. ✅ Update API_BASE_URL
4. ✅ Wrap app with DataProvider
5. ✅ Test with local server first
6. ✅ Deploy to production
7. ✅ Monitor and update content as needed

## Need Help?

- GitHub Pages: https://docs.github.com/pages
- Vercel: https://vercel.com/docs
- Firebase: https://firebase.google.com/docs/hosting

---

**Created for AL Easy Learning** 📚
Last Updated: ${new Date().toLocaleDateString()}
