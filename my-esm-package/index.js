// Custom CommonJS package
// Tries to use an ESM-only library - this will cause pkg warnings but work with fallback

// Try to require the ESM-only library (will fail, but we have fallback)
let simpleEsmLib;
let usingFallback = false;

try {
  simpleEsmLib = require('simple-esm-lib');
} catch (error) {
  console.warn('⚠ Warning: Could not load simple-esm-lib (ESM-only):', error.message);
  console.warn('⚠ Using fallback implementations instead');
  usingFallback = true;
  
  // Provide fallback implementations
  simpleEsmLib = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b,
    subtract: (a, b) => a - b,
    divide: (a, b) => b !== 0 ? a / b : NaN,
    PI: 3.14159,
    E: 2.71828
  };
}

function greet(name) {
  const fallbackNote = usingFallback ? ' (using fallback math)' : ' (using ESM lib)';
  return `Hello, ${name}! This is from my custom package${fallbackNote}.`;
}

function calculate(a, b) {
  return simpleEsmLib.add(a, b);
}

function advancedMath(x, y) {
  return {
    sum: simpleEsmLib.add(x, y),
    product: simpleEsmLib.multiply(x, y),
    difference: simpleEsmLib.subtract(x, y),
    quotient: simpleEsmLib.divide(x, y),
    constants: {
      pi: simpleEsmLib.PI,
      e: simpleEsmLib.E
    },
    usingFallback: usingFallback
  };
}

const VERSION = '1.0.0';

module.exports = {
  greet,
  calculate,
  advancedMath,
  VERSION,
  usingFallback
};
