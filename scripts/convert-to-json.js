/**
 * Convert TypeScript lessons data to JSON files
 */

const fs = require('fs');
const path = require('path');

// Read the lessons.ts file
const lessonsPath = path.join(__dirname, '..', 'src', 'data', 'lessons.ts');
const outputDir = path.join(__dirname, '..', 'public', 'data');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Reading lessons.ts...');
const fileContent = fs.readFileSync(lessonsPath, 'utf8');

// Extract lessons array
const lessonsMatch = fileContent.match(/export const lessons: Lesson\[\] = \[([\s\S]*?)\];(?=\s*export const quizzes)/);
const quizzesMatch = fileContent.match(/export const quizzes: Quiz\[\] = \[([\s\S]*?)\];/);

if (!lessonsMatch || !quizzesMatch) {
  console.error('❌ Could not find lessons or quizzes arrays in the file');
  process.exit(1);
}

console.log('Converting to JSON format...');

// Function to safely evaluate JavaScript object literals
function parseToJSON(content) {
  // Wrap in array brackets
  const wrapped = `[${content}]`;

  // Use eval in a controlled way (only for our own code)
  // This is safe because we're only parsing our own lesson data
  try {
    return eval(wrapped);
  } catch (error) {
    console.error('Error parsing content:', error);
    throw error;
  }
}

try {
  const lessons = parseToJSON(lessonsMatch[1]);
  const quizzes = parseToJSON(quizzesMatch[1]);

  // Write lessons.json
  const lessonsFile = path.join(outputDir, 'lessons.json');
  fs.writeFileSync(lessonsFile, JSON.stringify(lessons, null, 2));
  console.log(`✅ Created ${lessonsFile}`);
  console.log(`   - ${lessons.length} lessons exported`);

  // Write quizzes.json
  const quizzesFile = path.join(outputDir, 'quizzes.json');
  fs.writeFileSync(quizzesFile, JSON.stringify(quizzes, null, 2));
  console.log(`✅ Created ${quizzesFile}`);
  console.log(`   - ${quizzes.length} quizzes exported`);

  // Calculate file sizes
  const lessonsSize = (fs.statSync(lessonsFile).size / 1024).toFixed(2);
  const quizzesSize = (fs.statSync(quizzesFile).size / 1024).toFixed(2);

  console.log('\n📊 File Sizes:');
  console.log(`   - lessons.json: ${lessonsSize} KB`);
  console.log(`   - quizzes.json: ${quizzesSize} KB`);
  console.log(`   - Total: ${(parseFloat(lessonsSize) + parseFloat(quizzesSize)).toFixed(2)} KB`);

  console.log('\n🎉 Data export completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Choose a hosting option from DATA_HOSTING_GUIDE.md');
  console.log('2. Upload the public/data folder to your chosen host');
  console.log('3. Update API_BASE_URL in src/services/api.ts');
  console.log('4. Wrap your app with DataProvider');

} catch (error) {
  console.error('❌ Error during conversion:', error);
  process.exit(1);
}
