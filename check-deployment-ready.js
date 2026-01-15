#!/usr/bin/env node

/**
 * Pre-deployment checklist script
 * Run: node check-deployment-ready.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking deployment readiness...\n');

let allChecks = true;

// Check 1: package.json exists
const checkFile = (file, name) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${name} exists`);
    return true;
  } else {
    console.log(`❌ ${name} missing`);
    allChecks = false;
    return false;
  }
};

checkFile('package.json', 'package.json');
checkFile('next.config.js', 'next.config.js');
checkFile('.gitignore', '.gitignore');
checkFile('vercel.json', 'vercel.json');

// Check 2: Build script exists
if (fs.existsSync('package.json')) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (pkg.scripts && pkg.scripts.build) {
    console.log('✅ Build script exists');
  } else {
    console.log('❌ Build script missing in package.json');
    allChecks = false;
  }

  if (pkg.scripts && pkg.scripts.start) {
    console.log('✅ Start script exists');
  } else {
    console.log('❌ Start script missing in package.json');
    allChecks = false;
  }
}

// Check 3: Environment variables
if (fs.existsSync('.env.example')) {
  console.log('✅ .env.example exists');
  const envExample = fs.readFileSync('.env.example', 'utf8');
  
  if (envExample.includes('NEXT_PUBLIC_API_URL')) {
    console.log('✅ NEXT_PUBLIC_API_URL defined in .env.example');
  } else {
    console.log('⚠️  NEXT_PUBLIC_API_URL not in .env.example');
  }
} else {
  console.log('⚠️  .env.example missing (optional)');
}

// Check 4: No localhost URLs in code
console.log('\n🔍 Checking for hardcoded localhost URLs...');
const checkForLocalhost = (dir) => {
  const files = fs.readdirSync(dir);
  let found = false;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        if (checkForLocalhost(filePath)) found = true;
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('localhost:') && !content.includes('NEXT_PUBLIC_API_URL')) {
        console.log(`⚠️  Found localhost in: ${filePath}`);
        found = true;
      }
    }
  });

  return found;
};

if (fs.existsSync('src')) {
  const hasLocalhost = checkForLocalhost('src');
  if (!hasLocalhost) {
    console.log('✅ No hardcoded localhost URLs found');
  } else {
    console.log('⚠️  Warning: Hardcoded localhost URLs found. Use environment variables instead.');
  }
}

// Check 5: Git repository
if (fs.existsSync('.git')) {
  console.log('\n✅ Git repository initialized');
} else {
  console.log('\n❌ Git repository not initialized. Run: git init');
  allChecks = false;
}

// Check 6: Dependencies
console.log('\n🔍 Checking dependencies...');
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules exists');
} else {
  console.log('⚠️  node_modules missing. Run: npm install');
}

if (fs.existsSync('package-lock.json')) {
  console.log('✅ package-lock.json exists');
} else {
  console.log('⚠️  package-lock.json missing. Run: npm install');
}

// Summary
console.log('\n' + '='.repeat(50));
if (allChecks) {
  console.log('✅ All critical checks passed!');
  console.log('\n📝 Next steps:');
  console.log('1. Push to Git: git push origin main');
  console.log('2. Deploy to Vercel: vercel --prod');
  console.log('3. Set environment variables in Vercel dashboard');
  console.log('\nSee DEPLOYMENT.md for detailed instructions.');
} else {
  console.log('❌ Some checks failed. Please fix the issues above.');
}
console.log('='.repeat(50) + '\n');

process.exit(allChecks ? 0 : 1);
