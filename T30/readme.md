# T30 — Typed Express Handlers

## Goal
Build a TypeScript Express API with typed handlers, separate DTOs and stored records, environment variable validation, compiled JavaScript output, and automated API tests.

## Topics Covered

### 1. Typed Express Handlers
- Used Express `Request` and `Response` types.
- Created typed `getProducts` and `createProduct` handlers.

### 2. DTO vs Stored Record
- `CreateProductDTO` represents product data received from the client.
- `ProductRecord` represents a stored product and includes its `id`.

### 3. Request Validation
- Validated product name, price, and stock.
- Returned HTTP 400 for invalid product data.
- Returned HTTP 201 when a product was created.

### 4. Environment Variable Validation
- Read the `PORT` environment variable.
- Used port 5000 as the default.
- Rejected invalid port values.

### 5. TypeScript Build
- Used `tsc --noEmit` for typechecking.
- Used `tsc` to compile TypeScript into the `dist` directory.
- Started the compiled server with Node.js.

### 6. Automated API Testing
- Tested `GET /products`.
- Tested `POST /products`.
- Used Node.js built-in test and assertion modules.

## API Endpoints

### GET /products
Returns the available products.

### POST /products
Creates a product using JSON:

```json
{
  "name": "Monitor",
  "price": 8000,
  "stock": 5
}
```

## Commands

```bash
npm run typecheck
npm run build
npm start
npm test
```

## Verification Results
- TypeScript typecheck: Passed
- Build: Passed
- GET /products test: Passed
- POST /products test: Passed
- Total automated tests: 2
- Failed tests: 0

## Key Learning
TypeScript checks types before runtime, while automated API tests verify actual HTTP behavior. Both are needed for reliable backend development.
