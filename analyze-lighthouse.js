const fs = require('fs');

// Read and parse the lighthouse report
const reportData = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf8'));

console.log('🔍 Lighthouse Performance Issues:');
console.log('==================================');

// Check performance audits
const audits = reportData.audits;

// Key performance issues to check
const performanceAudits = [
  'first-contentful-paint',
  'largest-contentful-paint', 
  'speed-index',
  'total-blocking-time',
  'cumulative-layout-shift',
  'render-blocking-resources',
  'unused-css-rules',
  'unused-javascript',
  'modern-image-formats',
  'uses-text-compression',
  'font-display'
];

performanceAudits.forEach(auditId => {
  const audit = audits[auditId];
  if (audit && audit.score !== null && audit.score < 0.9) {
    console.log(`\n❌ ${audit.title}`);
    console.log(`   Score: ${Math.round(audit.score * 100)}/100`);
    if (audit.description) {
      console.log(`   Issue: ${audit.description}`);
    }
    if (audit.details && audit.details.items && audit.details.items.length > 0) {
      console.log(`   Details: ${audit.details.items.slice(0, 3).map(item => 
        item.url || item.source || item.node || 'Unknown'
      ).join(', ')}`);
    }
  }
});

// Check specific recommendations
if (audits['render-blocking-resources'] && audits['render-blocking-resources'].details) {
  console.log('\n🚫 Render Blocking Resources:');
  audits['render-blocking-resources'].details.items.forEach(item => {
    console.log(`   - ${item.url}`);
  });
}

console.log('\n💡 Quick fixes needed:');
console.log('- Optimize font loading with font-display: swap');
console.log('- Remove unused CSS/JS');  
console.log('- Compress/minify resources');
console.log('- Fix render-blocking resources');