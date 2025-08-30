const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

(async () => {
  try {
    console.log('Starting lighthouse test...');
    
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port
    };
    
    const fileUrl = 'file://' + process.cwd() + '/index.html';
    console.log('File URL:', fileUrl);
    const runnerResult = await lighthouse.default(fileUrl, options);
    
    const reportJson = runnerResult.report;
    const scores = JSON.parse(reportJson).categories;
    
    console.log('\n🚀 Lighthouse Scores:');
    console.log('Performance:', Math.round(scores.performance.score * 100));
    console.log('Accessibility:', Math.round(scores.accessibility.score * 100));
    console.log('Best Practices:', Math.round(scores['best-practices'].score * 100));
    console.log('SEO:', Math.round(scores.seo.score * 100));
    
    // Save report
    fs.writeFileSync('lighthouse-report.json', reportJson);
    console.log('\n📄 Report saved to lighthouse-report.json');
    
    await chrome.kill();
    
    // Check if any score is below 80
    const minScore = 80;
    let allPassed = true;
    
    for (const [category, data] of Object.entries(scores)) {
      const score = Math.round(data.score * 100);
      if (score < minScore) {
        console.error(`❌ ${category} score (${score}) is below minimum (${minScore})`);
        allPassed = false;
      }
    }
    
    if (allPassed) {
      console.log('\n✅ All Lighthouse scores passed!');
    } else {
      console.log('\n⚠️  Some scores are below the minimum threshold');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('Error running lighthouse:', error);
    process.exit(1);
  }
})();