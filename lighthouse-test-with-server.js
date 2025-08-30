const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const http = require('http');
const path = require('path');

// Simple HTTP server to serve the static files
function createServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(process.cwd(), req.url === '/' ? 'index.html' : req.url);
      
      // Security check - ensure we're serving files from current directory
      if (!filePath.startsWith(process.cwd())) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        
        // Set appropriate content type
        const ext = path.extname(filePath);
        const contentType = {
          '.html': 'text/html',
          '.css': 'text/css',
          '.js': 'application/javascript',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.ico': 'image/x-icon'
        }[ext] || 'text/plain';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });
    
    server.listen(0, 'localhost', () => {
      const port = server.address().port;
      console.log(`🌐 Server started on http://localhost:${port}`);
      resolve({ server, port });
    });
  });
}

(async () => {
  let server;
  
  try {
    console.log('Setting up test server...');
    const serverInfo = await createServer();
    server = serverInfo.server;
    const port = serverInfo.port;
    
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
    
    const testUrl = `http://localhost:${port}`;
    console.log('Testing URL:', testUrl);
    
    // Wait a moment for server to be ready
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const runnerResult = await lighthouse.default(testUrl, options);
    
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
    }
    
  } catch (error) {
    console.error('Error running lighthouse:', error);
    process.exit(1);
  } finally {
    if (server) {
      server.close();
      console.log('🔴 Server stopped');
    }
  }
})();