/**
 * Script to export lessons and quizzes to JSON files for hosting
 * Run with: node scripts/export-data.js
 */

const fs = require('fs');
const path = require('path');

// Import the data (you'll need to compile TypeScript first or convert to JS)
// For now, we'll read the compiled JavaScript files

const outputDir = path.join(__dirname, '..', 'public', 'data');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Note: This is a template - you'll need to manually copy your data
// or set up a build process to compile TypeScript

const instructions = `
📋 DATA EXPORT INSTRUCTIONS
============================

To export your lessons and quizzes data:

1. Your data is in: src/data/lessons.ts

2. Create two JSON files manually:
   - public/data/lessons.json (array of lessons)
   - public/data/quizzes.json (array of quizzes)

3. Host these files on:

   OPTION A - GitHub Pages (Recommended):
   • Create a new GitHub repo
   • Push your public/data folder
   • Enable GitHub Pages in repo settings
   • URL will be: https://YOUR-USERNAME.github.io/YOUR-REPO/data/lessons.json

   OPTION B - Vercel/Netlify:
   • Drop the public folder into Vercel or Netlify
   • Get instant hosting

   OPTION C - Firebase Hosting:
   • firebase init hosting
   • Point to public directory
   • firebase deploy

4. Update the API_BASE_URL in src/services/api.ts with your hosting URL

5. Your app will:
   ✅ Fetch data from the internet
   ✅ Cache it for 24 hours
   ✅ Work offline with cached data
   ✅ Fall back to bundled data if fetch fails

BENEFITS:
• App size reduced significantly
• Update content without app updates
• Better performance with caching
• Offline support

`;

console.log(instructions);

// Create README in public/data
fs.writeFileSync(
  path.join(outputDir, 'README.md'),
  `# Learning App Data

This directory contains the lesson and quiz data for the AL Easy Learning app.

## Files

- \`lessons.json\` - All lesson content
- \`quizzes.json\` - All quiz questions

## Hosting

These files should be hosted on a CDN or static file host for the app to fetch.

## Update Instructions

1. Export your data from \`src/data/lessons.ts\`
2. Convert to JSON format
3. Upload to your hosting service
4. App will automatically fetch and cache the data

Last updated: ${new Date().toISOString()}
`
);

console.log('\n✅ Created public/data directory');
console.log('✅ Created README.md with instructions');
console.log('\n📝 Next steps: Copy your data to JSON files and host them online');
