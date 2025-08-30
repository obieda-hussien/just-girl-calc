const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

console.log('Lighthouse type:', typeof lighthouse);
console.log('Lighthouse:', lighthouse);

// Test if it's a function
if (typeof lighthouse === 'function') {
  console.log('✅ lighthouse is a function');
} else {
  console.log('❌ lighthouse is NOT a function');
  console.log('Available methods/properties:', Object.keys(lighthouse));
}

// Check for default export
if (lighthouse.default && typeof lighthouse.default === 'function') {
  console.log('✅ lighthouse.default is a function');
} else {
  console.log('❌ lighthouse.default is NOT available or not a function');
}