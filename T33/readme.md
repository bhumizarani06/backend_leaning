# T33 — Category Search and Controlled Product Updates

## Concepts Covered
- MongoDB query operators: `$gte`, `$lte`, `$exists`, `$gt`
- Field projection using `.select()`
- Safe updates using `$set` and allowed fields
- Missing fields using `$exists: false`
- Input validation for filters and product IDs
- Offset pagination using `.skip()` and `.limit()`
- Cursor pagination using MongoDB ObjectId
- Protecting fields such as `stock` from unauthorized updates

## Run the Project
```bash
npm install
npm run dev
```

## API Endpoints

- `GET /health` — Health check
- `GET /products?category=Electronics&minPrice=500&maxPrice=2000` — Search products
- `PATCH /products/:id` — Update allowed fields (`name`, `price`)
- `GET /products/missing-category` — Find products without a category
- `GET /products/page?page=1&limit=5` — Offset pagination
- `GET /products/cursor?limit=5` — Cursor pagination
- `GET /products/cursor?after=OBJECT_ID&limit=5` — Continue from a cursor

## Verification
- Build completed successfully using `npm run build`.
- Product search and pagination endpoints were tested.
- PATCH response confirmed that `stock` remained unchanged when an update request included `stock: 99999`.
