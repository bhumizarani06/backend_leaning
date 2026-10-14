# T34 — Mongoose ODM

## Goal
Reimplement the product repository using Mongoose while keeping service behavior unchanged.

## Concepts Covered
- Difference between MongoDB Native Driver and Mongoose ODM.
- Schema and model creation.
- Type casting and schema validation.
- Custom validation using `Number.isInteger`.
- Middleware hooks using `pre("save")`.
- Unique indexes and duplicate SKU errors.
- Update validation using `runValidators: true`.
- Mongoose timestamps and version key (`__v`).
- TypeScript typechecking and compilation.

## Project Structure

```text
T34/
├── src/
│   ├── models/
│   │   └── product.model.ts
│   ├── repositories/
│   │   └── product.repository.ts
│   ├── services/
│   │   └── product.service.ts
│   └── server.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Product Schema

The Product model contains:

- `name`: required string, trimmed.
- `sku`: required string, trimmed and unique.
- `price`: required number with a minimum of `0`.
- `stock`: required non-negative integer.
- `createdAt` and `updatedAt`: automatically maintained timestamps.

## Validation Results

| Test | Expected result |
|---|---|
| Negative price | Rejected |
| Fractional stock | Rejected |
| Duplicate SKU | Rejected by unique index |
| Negative stock update | Rejected by update validators |
| Valid product | Saved successfully |

## Important Notes

- A schema defines document fields and validation rules.
- A model provides methods to create, find, update and delete documents.
- Mongoose casts compatible values and validates data against the schema.
- `unique: true` declares a unique database index; it is not a normal Mongoose validator.
- `runValidators: true` enables applicable schema validators for update operations.
- `pre("save")` runs before a document is saved. Query updates such as `findOneAndUpdate()` do not trigger `pre("save")`.
- `timestamps: true` adds `createdAt` and `updatedAt`.
- Mongoose documents include the version key `__v` by default.
- Existing test records remain in MongoDB between program runs, so duplicate SKU errors can occur during repeated tests.

## Environment Variables

Create a `.env` file:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/backend_learning_t34_unique
PORT=5000
```

Do not commit real credentials or secrets.

## Run the Project

Install dependencies:

```powershell
npm install
```

Typecheck:

```powershell
npm run typecheck
```

Build:

```powershell
npm run build
```

Run verification:

```powershell
npm start
```

## Completion Criteria

- [x] Product repository implemented using Mongoose.
- [x] Service behavior retained.
- [x] Schema casting and validation tested.
- [x] Duplicate SKU behavior tested.
- [x] Update validators tested.
- [x] Typecheck and build pass.
- [x] Runtime verification passes.

**Note:** `server.ts` currently runs verification checks; it is not an HTTP server.
