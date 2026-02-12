# NCC_PKG - Testing @yao-pkg/pkg ESM Limitations

A Node.js Express application designed to test and demonstrate @yao-pkg/pkg's limitations when bundling ESM (ECMAScript Modules) packages.

## Project Purpose

This project was created to:

- **Test @yao-pkg/pkg limitations** - Specifically testing version **6.11.0** and its ability to handle ESM modules
- **Understand the "Failed to make bytecode" warning** - This occurs when pkg encounters ESM modules with `export` syntax and cannot compile them to bytecode
- **Verify that executables still work** - Even though pkg cannot create bytecode for ESM modules, it copies the source code into the executable, which still functions correctly
- **Test fallback mechanisms** - The application gracefully handles ESM loading failures with fallback implementations
- **Document the solution** - Note that **@yao-pkg/pkg version 6.13.1** (just released) has overcome this limitation and properly handles ESM modules

### What We Learned

When pkg encounters an ESM-only module during bundling:
1. ⚠️ It generates a warning: `Failed to make bytecode for file ...`
2. ⚠️ Shows error: `SyntaxError: Unexpected token 'export'`
3. ✅ But it **copies the raw source code** into the executable snapshot
4. ✅ The executable still works, though the ESM module may need fallback handling
5. 🎉 Version 6.13.1+ resolves these issues completely

---

## Overview

This is a simple Express.js server with:
- Basic HTTP endpoints
- Custom local package (`my-esm-package`) that attempts to use an ESM-only library
- Fallback implementations when ESM modules fail to load
- Demonstrates real-world pkg bundling scenarios

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Run the server
npm start
```

Visit http://localhost:3000/

### Build Executable

```bash
# Build for current platform
npm run build
```

The executable will be created in the `dist/` folder.

### Run Executable

```bash
# Windows
.\dist\ncc-pkg.exe

# Linux/macOS
./dist/ncc-pkg
```

## Available Routes

- `GET /` - Hello World
- `GET /api/hello` - JSON response
- `GET /api/esm-test` - Tests the custom ESM package (uses fallback if ESM fails)
- `GET /about` - Application information

## Technical Details

### Project Structure

```
NCC_PKG/
├── index.js                        # Main Express application
├── package.json                     # Project config with pkg settings
├── my-esm-package/                 # Custom CommonJS package
│   ├── index.js                    # Uses ESM lib with fallback
│   └── simple-esm-lib/             # ESM-only library (triggers warning)
│       ├── package.json            # Has "type": "module"
│       └── index.js                # Uses export syntax
└── dist/                           # Build output (generated)
```

### The ESM Test

**`simple-esm-lib`** is an ESM-only package that:
- Has `"type": "module"` in package.json
- Uses `export` statements
- Cannot be loaded with `require()` in CommonJS context
- Triggers the "Failed to make bytecode" warning during pkg build

**`my-esm-package`** attempts to use it with fallback:
```javascript
try {
  simpleEsmLib = require('simple-esm-lib');
} catch (error) {
  // Use fallback implementations
}
```

### Build Process

When running `npm run build`, you'll see:

```
> Warning Failed to make bytecode node24-x64 for file C:\snapshot\NCC_PKG\node_modules\simple-esm-lib\index.js

SyntaxError: Unexpected token 'export'
```

This is **expected behavior** in pkg 6.11.0. The build completes successfully, and the executable works with fallback code.

### Runtime Behavior

When running the executable built with pkg 6.11.0, you'll see these warnings at startup:

```
⚠ Warning: Could not load simple-esm-lib (ESM-only): UNEXPECTED-20
⚠ Using fallback implementations instead

✓ Express server running at http://localhost:3000/
```

This shows that:
- The ESM module cannot be loaded at runtime in the bundled executable
- The application gracefully falls back to the built-in implementations
- The server starts successfully and all endpoints work correctly

The `UNEXPECTED-20` error is pkg's way of indicating it couldn't load an ESM module in the CommonJS context. The fallback mechanism ensures the application continues to function normally.

## Dependencies

- **Express.js** ^4.18.2 - Web framework
- **my-esm-package** - Custom local package (CommonJS)
- **simple-esm-lib** - Custom ESM-only library (triggers pkg warning)
- **@yao-pkg/pkg** ^6.11.0 - Packaging tool (upgrade to 6.13.1+ for full ESM support)

## Upgrading to pkg 6.13.1+

To eliminate the ESM warnings and get native ESM support:

```bash
npm install @yao-pkg/pkg@6.13.1
npm run build
```

The new version handles ESM modules natively without warnings or fallbacks needed.

## Requirements

**Development:**
- Node.js 12+
- npm

**Running the executable:**
- None! Completely standalone.

## License

ISC
