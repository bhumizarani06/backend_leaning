# T35 — Unique and Compound Indexes

## Goal
Enforce unique product SKUs and improve catalog query performance using MongoDB indexes.

## Indexes
- **Unique index:** `{ sku: 1 }` prevents duplicate SKUs.
- **Compound index:** `{ category: 1, price: 1 }` optimizes category-and-price queries.

## Query Performance

Query:
```js
{ category: "Electronics", price: { $lt: 2000 } }
```

| Metric | Before compound index | After compound index |
|---|---:|---:|
| Documents returned | 78 | 78 |
| Documents examined | 1000 | 78 |
| Index keys examined | 0 | 78 |
| Query plan | COLLSCAN | IXSCAN + FETCH |

The query examined 92.2% fewer documents after adding the compound index for this dataset.

## Duplicate SKU Handling
- First product creation: HTTP `201 Created`.
- Reusing the same SKU: HTTP `409 Conflict`.
- Error message: `A product with this SKU already exists`.

## Run the Project

```powershell
npm install
npm run seed
npm run query:plan
npm run build
npm run dev
```

The `.env` file must contain a valid MongoDB connection URI.

## Important Concepts
- `COLLSCAN`: scans collection documents.
- `IXSCAN`: scans index entries.
- `FETCH`: retrieves matching documents.
- `explain("executionStats")`: reports query execution statistics.
- Indexes improve suitable reads but consume storage and add write-maintenance costs.

## Verification
- [ ] TypeScript build passes.
- [ ] Seed inserts 1,000 products.
- [ ] Query plan uses the compound index.
- [ ] Duplicate SKU is rejected with HTTP 409.
