# T27 — TypeScript Compiler

## Objective
Learn TypeScript compilation, strict type checking, type inference, function signatures, interfaces, union types, and type narrowing.

## Concepts Covered
- TypeScript compiler (`tsc`)
- `tsconfig.json` configuration
- Strict type checking
- Explicit types and type inference
- Function parameters and return types
- Interfaces and typed arrays
- TypeScript compile-time errors
- Type narrowing with `undefined`
- Compiling TypeScript into JavaScript
- Running compiled JavaScript with Node.js

## Project Structure

```text
T27/
├── src/
│   ├── cart.ts
│   └── reward.ts
├── dist/
│   ├── cart.js
│   └── reward.js
├── package.json
├── tsconfig.json
└── readme.md
```

## Commands

Install dependencies:

```powershell
npm install
```

Check types without generating output:

```powershell
npm run typecheck
```

Compile TypeScript:

```powershell
npm run build
```

Run compiled JavaScript:

```powershell
npm start
```

## Sample Output

```text
Cart total in cents: 400
Reward discount in cents: 0
Final total in cents: 400
Test line total: 1500
Product name: Laptop
Missing product: Product not found
```

## Error Testing

Two intentional compile-time errors were tested:

1. Passing a string to a function expecting `CartItem[]`.
2. Assigning a string to a variable declared as `number`.

Both errors were corrected, and type checking and compilation succeeded.

## Key Learning

TypeScript detects many type-related errors before runtime. The TypeScript compiler generates JavaScript, which Node.js executes. Runtime validation is still needed for untrusted data such as API request bodies.
