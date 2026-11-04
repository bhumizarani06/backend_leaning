# T47 – PostgreSQL with Node.js (pg)

## 1. Objective

The objective of T47 is to integrate PostgreSQL with Node.js using the `pg` package and implement safe database operations.

### Learning Outcomes

- Configure PostgreSQL connection pooling.
- Connect PostgreSQL with Node.js.
- Perform Product CRUD operations.
- Use parameterized queries with `$1`, `$2` placeholders.
- Retrieve inserted and updated records using `RETURNING`.
- Implement UPSERT using `ON CONFLICT`.
- Execute transactions using a single database client.
- Safely validate dynamic sorting columns and order.
- Understand differences between MySQL and PostgreSQL drivers.

## 2. Technologies Used

- Node.js
- PostgreSQL 18
- PostgreSQL Node.js Driver (`pg`)
- JavaScript
- PowerShell

## 3. Project Structure

```text
T47/
│
├── migrations/
│   └── 001_create_products.sql
│
├── src/
│   ├── api-comparison.js
│   ├── db.js
│   ├── product-transaction.js
│   ├── products-sort.js
│   ├── products.js
│   ├── test-connection.js
│   ├── test-products.js
│   └── test-sorting.js
│
├── package.json
├── package-lock.json
└── README.md
```

## 4. Installation

Install the PostgreSQL driver:

```powershell
npm install pg
```

## 5. Database Setup

Create the database:

```sql
CREATE DATABASE t47_products;
```

Connect to the database:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d t47_products
```

Create the products table:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0)
);
```

### Table Constraints

- `SERIAL`: Automatically generates ID values.
- `PRIMARY KEY`: Uniquely identifies each product.
- `NOT NULL`: Prevents empty required values.
- `UNIQUE`: Prevents duplicate SKU values.
- `CHECK`: Ensures price is not negative.

## 6. PostgreSQL Connection Pool

The `src/db.js` file configures the PostgreSQL connection pool using the `Pool` class.

```javascript
const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "t47_products",
    user: "postgres",
    password: "YOUR_POSTGRES_PASSWORD",
});

module.exports = pool;
```

**Why Pool?**

A connection pool manages reusable database connections and avoids creating a new connection for every query.

The actual database password is kept locally and should never be committed to GitHub. In a production project, use environment variables.

## 7. Product CRUD Operations

The `src/products.js` file implements the following operations:

| Operation | SQL command |
|---|---|
| Get all products | SELECT |
| Create product | INSERT |
| Get product by ID | SELECT with WHERE |
| Update product | UPDATE |
| Delete product | DELETE |
| Insert or update by SKU | INSERT with ON CONFLICT |

### Parameterized Queries

PostgreSQL uses `$1`, `$2`, `$3` placeholders.

Example:

```javascript
const result = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [id]
);
```

**Purpose:** Parameterized queries separate SQL instructions from user-provided values and help prevent SQL injection.

### RETURNING

PostgreSQL supports `RETURNING` to retrieve the affected row directly.

```sql
INSERT INTO products (name, sku, category, price)
VALUES ($1, $2, $3, $4)
RETURNING *;
```

This avoids running a separate SELECT query after inserting a product.

## 8. UPSERT Using ON CONFLICT

UPSERT means inserting a new record or updating an existing record when a unique conflict occurs.

```sql
INSERT INTO products (name, sku, category, price)
VALUES ($1, $2, $3, $4)
ON CONFLICT (sku)
DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    price = EXCLUDED.price
RETURNING *;
```

- `ON CONFLICT (sku)`: Checks for an existing SKU.
- `DO UPDATE`: Updates the existing product.
- `EXCLUDED`: Refers to the values proposed for insertion.
- `RETURNING *`: Returns the inserted or updated row.

## 9. Safe Dynamic Sorting

The `src/products-sort.js` file implements sorting with an allowlist.

Allowed columns:

```javascript
const allowedSortColumns = ["id", "name", "price", "category"];
```

Allowed sort orders:

```javascript
["ASC", "DESC"]
```

**Important:** SQL placeholders cannot represent column names or SQL keywords. Therefore, dynamic identifiers must be validated against an allowlist before building the query.

Invalid column and sort-order inputs are rejected.

## 10. Transactions

The `src/product-transaction.js` file demonstrates transaction handling using one PostgreSQL client.

Transaction flow:

```text
Connect Client
      |
    BEGIN
      |
 Execute Queries
      |
  COMMIT
      |
 Release Client
```

If an error occurs:

```text
Error
  |
ROLLBACK
  |
Release Client
```

Important methods:

- `pool.connect()` – Acquires a client.
- `client.query("BEGIN")` – Starts a transaction.
- `client.query("COMMIT")` – Commits changes.
- `client.query("ROLLBACK")` – Reverts transaction changes.
- `client.release()` – Returns the client to the pool.

The test transaction used SELECT queries and did not modify product records.

## 11. MySQL vs PostgreSQL

| Feature | MySQL (mysql2) | PostgreSQL (pg) |
|---|---|---|
| Driver | mysql2 | pg |
| Placeholder | `?` | `$1`, `$2` |
| Query method | `execute()` | `query()` |
| Query result | `[rows, fields]` | `result.rows` |
| Insert ID | `insertId` | `RETURNING id` |
| Upsert | `ON DUPLICATE KEY UPDATE` | `ON CONFLICT ... DO UPDATE` |
| Transaction | `beginTransaction()` | `BEGIN` |
| Commit | `commit()` | `COMMIT` |
| Rollback | `rollback()` | `ROLLBACK` |

**Comparison Note:** Existing MySQL exercises in earlier roadmap folders demonstrated parameterized queries and transaction handling. A matching MySQL Product CRUD API was not available, so this task documents driver and query-handling differences rather than claiming identical CRUD API response comparison.

## 12. Testing Commands

Check JavaScript syntax:

```powershell
Get-ChildItem .\src -Filter "*.js" | ForEach-Object {
    Write-Host "`nChecking $($_.Name)"
    node --check $_.FullName
}
```

Test database connection:

```powershell
node .\src\test-connection.js
```

Test product operations:

```powershell
node .\src\test-products.js
```

Test sorting:

```powershell
node .\src\test-sorting.js
```

Test transaction:

```powershell
node .\src\product-transaction.js
```

Compare PostgreSQL query results:

```powershell
node .\src\api-comparison.js
```

## 13. Final Database Verification

```sql
SELECT id, name, sku, category, price
FROM products
ORDER BY id;
```

### Verified Database Records

| ID | Name | SKU | Category | Price |
|---:|---|---|---|---:|
| 1 | laptop | LAP101 | Electronics | 52000.00 |
| 2 | Keyboard | KEY101 | Electronics | 1200.00 |
| 3 | Mouse | MOU101 | Electronics | 600.00 |
| 4 | headphones | H123 | electronics | 15000.00 |
| 5 | updated Test Headphones | UPSERT_TEST_01 | Electronics | 18000.00 |

**Total verified records: 5**

## 14. Final Verification

- PostgreSQL database connection successful.
- Products table created successfully.
- Product CRUD functions implemented.
- Parameterized queries implemented.
- `RETURNING` tested.
- UPSERT with `ON CONFLICT` tested.
- Dynamic sorting validation tested.
- Transaction handling tested.
- All 8 JavaScript files passed `node --check`.
- Final database records verified successfully.

## 15. Conclusion

T47 successfully demonstrates how to integrate PostgreSQL with Node.js using the `pg` driver. It covers connection pooling, safe parameterized queries, CRUD operations, UPSERT, dynamic sorting validation, and transaction management.

This task builds practical understanding of PostgreSQL database operations and the differences between PostgreSQL and MySQL.