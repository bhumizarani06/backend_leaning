# T29 — TypeScript Generics and Utility Types

## Objective

Learn how to reuse types with generics, select or modify object fields with utility types, and validate untrusted data safely at runtime.

## Topics Covered

1. **Generics** — `ApiResponse<T>` and `Repository<T>`
2. **Utility Types**
   - `Pick` — select specific fields
   - `Omit` — exclude specific fields
   - `Partial` — make fields optional
   - `Readonly` — prevent reassignment through the type
3. **Unknown Data** — treat external data as untrusted
4. **Runtime Validation** — validate product name, price, and stock
5. **Type Assertions** — understand why `as Product` does not validate data

## Project Structure

```text
T29/
├── src/
│   ├── index.ts
│   ├── repository.ts
│   ├── types.ts
│   ├── validate-product.ts
│   ├── validation-demo.ts
│   └── unsafe-assertion.ts
├── package.json
├── tsconfig.json
└── readme.md
```

## How to Run

Compile TypeScript:

```powershell
npm run build
```

Run the main demo:

```powershell
npm start
```

Run product validation:

```powershell
node dist/validation-demo.js
```

Demonstrate an unsafe assertion:

```powershell
npm run demo:unsafe
```

The unsafe demo intentionally throws a runtime `TypeError`.

## Validation Example

Valid input:

```json
{
  "name": "Keyboard",
  "price": 1200,
  "stock": 8
}
```

Expected output:

```text
Valid product: { name: 'Keyboard', price: 1200, stock: 8 }
```

Invalid input:

```json
{
  "name": "Mouse",
  "price": "free",
  "stock": 10
}
```

Expected validation error:

```text
Validation error: Price must be a positive number
```

## Key Learning

TypeScript types and assertions do not validate external data at runtime. Data received from an API or client must be checked before it is trusted or used.
