# My ESM Package

A custom ESM-only package created to test @yao-pkg/pkg bundling behavior.

## Purpose

This package is intentionally created as ESM-only (with `"type": "module"`) to reproduce the error:

```
SyntaxError: Unexpected token 'export'
```

This error occurs when pkg tries to compile ESM modules that use `export` syntax in a CommonJS context.

## Functions

- `greet(name)` - Returns a greeting message
- `calculate(a, b)` - Adds two numbers
- `VERSION` - Package version constant

## Usage

This package is meant to be used with `require()` in a CommonJS context to trigger the pkg compilation error.
