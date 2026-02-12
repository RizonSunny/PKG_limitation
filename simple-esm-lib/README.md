# Simple ESM Library

A tiny ESM-only math library created to test pkg bundling with nested ESM dependencies.

## Purpose

This library is intentionally ESM-only (with `"type": "module"` and `export` syntax) to demonstrate:
- ESM modules nested inside CommonJS packages
- How pkg handles (or fails to handle) ESM dependencies

## Functions

### Math Operations
- `add(a, b)` - Addition
- `multiply(a, b)` - Multiplication
- `subtract(a, b)` - Subtraction
- `divide(a, b)` - Division (throws error on divide by zero)

### Constants
- `PI` - 3.14159
- `E` - 2.71828

## The Issue

When `my-esm-package` (CommonJS) tries to `require('simple-esm-lib')` (ESM-only), it will fail because:
1. ESM modules cannot be loaded with `require()`
2. pkg cannot properly bundle this mixed module scenario
3. This reproduces real-world issues with ESM dependencies in CommonJS projects
