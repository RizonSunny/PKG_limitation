# Testing pkg ESM Compilation Error

## Setup

This project now includes a custom ESM-only package (`my-esm-package`) that will cause pkg to fail during bundling.

## The Error

When you run `npm run build`, pkg will encounter an ESM module with `export` syntax and fail with:

```
SyntaxError: Unexpected token 'export'
    at new Script (node:vm:118:7)
    ...
> Warning Failed to make bytecode node24-x64 for file /snapshot/NCC_PKG/node_modules/my-esm-package/index.js
```

## Why This Happens

1. The main app (`index.js`) uses CommonJS (`require()`)
2. It tries to `require('my-esm-package')`
3. `my-esm-package` is ESM-only (has `"type": "module"` and uses `export` syntax)
4. pkg tries to compile the ESM code as CommonJS during bundling
5. This fails because `export` is not valid in CommonJS

## To Reproduce

1. Install dependencies:
   ```bash
   npm install
   ```

2. Try to build:
   ```bash
   npm run build
   ```

3. You'll see the error similar to what you saw with `uint8array-extras`

## The Custom Package

Located in `./my-esm-package/`:
- `package.json` - Has `"type": "module"` to force ESM
- `index.js` - Uses `export` syntax

## Solutions

To fix this, you would need to either:
1. Convert the main app to ESM (add `"type": "module"` to root package.json and use `import`)
2. Convert the custom package to CommonJS (remove `"type": "module"` and use `module.exports`)
3. Use a bundler like esbuild or webpack before pkg
