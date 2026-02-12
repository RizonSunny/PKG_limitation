// Express Hello World Application

const express = require('express');

// Try to require our custom ESM package - this will cause pkg issues!
const myEsmPackage = require('my-esm-package');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Root route - Hello World
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Additional route examples
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World from API!' });
});

// Route to test our custom ESM package
app.get('/api/esm-test', (req, res) => {
  try {
    const greeting = myEsmPackage.greet('World');
    const result = myEsmPackage.calculate(5, 3);
    
    res.json({
      message: 'Custom ESM package loaded!',
      greeting: greeting,
      calculation: `5 + 3 = ${result}`,
      packageVersion: myEsmPackage.VERSION
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to use ESM package',
      message: error.message
    });
  }
});

app.get('/about', (req, res) => {
  res.json({
    app: 'Express Hello World',
    description: 'Testing custom ESM package with pkg',
    customPackage: 'my-esm-package (ESM-only)'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`\n✓ Express server running at http://localhost:${port}/`);
  console.log('Routes available:');
  console.log('  - http://localhost:3000/');
  console.log('  - http://localhost:3000/api/hello');
  console.log('  - http://localhost:3000/api/esm-test (tests custom ESM package)');
  console.log('  - http://localhost:3000/about');
  console.log(`\n✨ Custom ESM package v${myEsmPackage.VERSION} loaded!\n`);
});
