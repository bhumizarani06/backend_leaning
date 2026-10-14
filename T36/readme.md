# T36 — MongoDB Aggregation

## Goal
Practice MongoDB aggregation pipelines using TypeScript.

## Concepts
- Aggregation pipeline
- `$match`, `$group`, `$sum`
- `$project`, `$sort`, `$limit`
- `$unwind`
- Monthly customer spending
- Top-selling products
- TypeScript compilation and NodeNext imports

## Run
```bash
npm install
npm run dev:seed
npm run dev:aggregation
npm run build
npm start
```

## Results
- C1 October spending: 450
- C2 October spending: 400
- C1 November spending: 0
- Keyboard sold: 3 units
- Mouse sold: 3 units
- Monitor sold: 1 unit
