/**
 * Convert TypeScript lessons data to JSON files by importing directly
 */

const fs = require('fs');
const path = require('path');

// We'll use a different approach - compile and execute TypeScript
const { execSync } = require('child_process');

const outputDir = path.join(__dirname, '..', 'public', 'data');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('📦 Compiling TypeScript...');

try {
  // Compile the lessons.ts file
  execSync('npx tsc --outDir temp-build src/data/lessons.ts src/types/index.ts --module commonjs --target es2015 --esModuleInterop --skipLibCheck', {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe'
  });

  console.log('✅ TypeScript compiled successfully');

  // Now we can require the compiled JavaScript
  const tempBuildPath = path.join(__dirname, '..', 'temp-build', 'data', 'lessons.js');

  // Clear require cache
  delete require.cache[require.resolve(tempBuildPath)];

  const { lessons, quizzes } = require(tempBuildPath);

  console.log('📝 Writing JSON files...');

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

  // Cleanup temp build
  console.log('\n🧹 Cleaning up...');
  const tempBuildDir = path.join(__dirname, '..', 'temp-build');
  if (fs.existsSync(tempBuildDir)) {
    fs.rmSync(tempBuildDir, { recursive: true, force: true });
  }

  console.log('\n🎉 Data export completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Choose a hosting option from DATA_HOSTING_GUIDE.md');
  console.log('2. Upload the public/data folder to your chosen host');
  console.log('3. Update API_BASE_URL in src/services/api.ts');
  console.log('4. Wrap your app with DataProvider');

} catch (error) {
  console.error('❌ Error during conversion:', error.message);

  // Cleanup on error
  const tempBuildDir = path.join(__dirname, '..', 'temp-build');
  if (fs.existsSync(tempBuildDir)) {
    fs.rmSync(tempBuildDir, { recursive: true, force: true });
  }

  process.exit(1);
}
