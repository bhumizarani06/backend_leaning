# T50 — PostgreSQL MVCC

## Goal

Understand PostgreSQL Multi-Version Concurrency Control (MVCC), isolation levels, concurrent updates, serialization failures, and safe transaction retries.

## Concepts Covered

1. MVCC snapshots
2. READ COMMITTED, REPEATABLE READ, SERIALIZABLE
3. Conditional stock updates
4. Row-level locking
5. Deadlocks and serialization failures
6. Retrying complete transactions
7. Bounded retry attempts
8. Simulated receipt safety

## Project Structure

```text
T50/
├── config/
│   └── db.js
├── sql/
├── src/
│   ├── test-connection.js
│   ├── order.js
│   ├── race-test.js
│   ├── conflict-test.js
│   └── retry-test.js
├── package.json
└── README.md
```

## Database Setup

Database: `t50_mvcc`

Table:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    stock INTEGER NOT NULL CHECK (stock >= 0),
    price NUMERIC(10,2) NOT NULL
);
```

Sample product:

```sql
INSERT INTO products (name, stock, price)
VALUES ('Keyboard', 1, 1200.00);
```

## Configuration

The PostgreSQL connection uses the `pg` package and a connection pool.

Database password is read from the `PGPASSWORD` environment variable.

## Installation

```powershell
npm init -y
npm install pg
```

## Run Tests

Check database connection:

```powershell
node .\src\test-connection.js
```

Check JavaScript syntax:

```powershell
Get-ChildItem .\src\*.js | ForEach-Object {
    Write-Host "`nChecking $($_.Name)"
    node --check $_.FullName
}
```

Last-item concurrency test:

```powershell
node .\src\race-test.js
```

Controlled SERIALIZABLE conflict:

```powershell
node .\src\conflict-test.js
```

Retry test:

```powershell
node .\src\retry-test.js
```

## Reset Test Stock

Before running the retry test, reset Keyboard stock to 1:

```sql
UPDATE products
SET stock = 1
WHERE id = 1;
```

Or run from PowerShell:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d t50_mvcc -c "UPDATE products SET stock = 1 WHERE id = 1;"
```

## Important Test Results

### 1. Controlled Conflict

Both customers read stock as 1.

```text
Customer B read stock: 1
Customer A read stock: 1
Customer A committed successfully
Customer B failed: 40001 could not serialize access due to concurrent update
```

This demonstrates a SERIALIZABLE transaction conflict.

### 2. Retry Test

```text
Customer B - Attempt 1
Customer A - Attempt 1
Customer B read stock: 1
Customer A read stock: 1
Customer A order committed
Receipt sent to: Customer A
Customer B failed: 40001
Customer B retrying whole transaction...
Customer B - Attempt 2
Customer B read stock: 0
Customer B failed: Out of stock
Customer 1: Success
Customer 2: Out of stock
```

### 3. Final Stock Verification

```sql
SELECT id, name, stock, price
FROM products;
```

Expected final stock after the successful retry test:

```text
Keyboard | 0
```

## Important Learnings

- MVCC provides transaction snapshots.
- SERIALIZABLE isolation can reject conflicting transactions.
- SQLSTATE `40001` indicates a serialization failure.
- SQLSTATE `40P01` indicates a deadlock.
- Retry the complete transaction, not only the failed SQL statement.
- Every retry must use a fresh transaction.
- Retry attempts must be bounded.
- Conditional updates prevent stock from becoming negative.
- External side effects should happen after a successful commit.

## Receipt Safety Note

This project uses an in-memory JavaScript `Set` to simulate sending a receipt only once per customer during the test process.

For a production application, use a database-backed idempotency key or an outbox pattern to protect against duplicate external side effects across process restarts and failures.

## Conclusion

T50 demonstrates PostgreSQL MVCC, concurrent stock updates, SERIALIZABLE conflicts, bounded transaction retries, and simulated receipt handling.
