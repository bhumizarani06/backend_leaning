# T37 — MongoDB Atomic Updates and Transactions

## Goal
Practice atomic stock updates, conditional updates, order creation, and concurrency testing with MongoDB.

## Concepts Covered

- **Atomic Updates:** Update a document safely using MongoDB update operators.
- **Conditional Updates:** Use `$gte` to ensure stock is at least 1 before decrementing it.
- **Stock Management:** Use `$inc: { stock: -1 }` to reduce stock atomically.
- **Order Creation:** Save order details in the `orders` collection.
- **Failure Recovery:** Attempt to restore stock if order creation fails.
- **Concurrency:** Test simultaneous requests when only one unit remains.
- **Transactions and Sessions:** Understand how multiple database operations can commit or roll back together.

## Project Structure

- `src/config.ts` — MongoDB connection and configuration.
- `src/product.ts` — Product type definition.
- `src/order.ts` — Order type definition.
- `src/catalog.ts` — Insert a product into the catalog.
- `src/stock.ts` — Conditionally reduce product stock.
- `src/order-service.ts` — Reserve stock and create an order.
- `src/check-database.ts` — Check the database connection.
- `test/stock-concurrency.test.ts` — Test concurrent stock reservations.

## Environment Variables

Create a `.env` file with:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DATABASE=backend_learning_t37
PORT=5000
```

## Commands

```bash
npm run typecheck
npm run build
npx tsx --test test/stock-concurrency.test.ts
```

To run the compiled application, use `npm start` only if the configured start script points to an existing compiled entry point.

## Concurrency Test

The test uses a separate `stock_concurrency_test` collection with a test product whose stock is 1.

Expected result:

- Two concurrent reservation requests are attempted.
- Exactly one reservation succeeds.
- Final stock is 0.
- The test passes without modifying the existing `products` collection.

## Transaction Limitation

The current MongoDB instance uses standalone mode. Multi-document transactions require a replica set or sharded cluster.

The order service uses a compensation attempt to restore stock if order insertion fails. This is not equivalent to a database transaction and cannot guarantee complete consistency in every failure scenario.

## Verification Status

- TypeScript typecheck: Passed.
- TypeScript build: Passed.
- Concurrent stock reservation test: Passed.
- True multi-document transaction test: Not completed; replica-set configuration is required.

## Conclusion

This task demonstrates conditional atomic stock updates, basic order creation, failure recovery concepts, and concurrent stock reservation testing in MongoDB.
