# T39 — SQL SELECT, INSERT, UPDATE, DELETE

## Goal
Practice SQL queries using a separate MySQL test database.

## Topics Covered
- SELECT with explicit columns
- WHERE, AND, OR, and BETWEEN
- ORDER BY and LIMIT
- INSERT, UPDATE, and DELETE
- NULL, IS NULL, and IS NOT NULL
- Empty results and affected-row counts
- Parameterized queries using Node.js and mysql2

## Environment
- MySQL 8.0.46
- Node.js v24.18.0
- mysql2 3.24.6

## Database
Practice database: `t39_shop_test`

The existing `t38_shop` database is kept separate and unchanged.

## Files
- `src/db.js` — Node.js connection and parameterized SELECT example
- `sql/exercises.sql` — 20 SQL practice exercises

## Run the Parameterized Query
From the T39 folder:

```powershell
node .\src\db.js
```

Enter the MySQL root password when prompted.

The example selects products whose price is below 50 using a bound parameter (`?`).

## Run SQL Exercises
1. Connect to MySQL.
2. Select the practice database:

```sql
USE t39_shop_test;
```

3. Open `sql/exercises.sql` and run queries individually.
4. Before UPDATE or DELETE, use SELECT to verify the exact target row.
5. Check affected-row counts after write operations.

**Safety:** Do not run all write exercises blindly. INSERT, UPDATE, and DELETE change data. Only modify the dedicated test row used by the exercise.

## Verification
- Check the table structure with `DESCRIBE products;`
- Check query results with SELECT.
- Test NULL using `IS NULL` and `IS NOT NULL`.
- Confirm empty-result behavior.
- Verify UPDATE and DELETE with SELECT before and after.

## Important Learning
- Use explicit columns instead of `SELECT *` when only specific fields are needed.
- Always use a suitable WHERE condition for UPDATE and DELETE.
- Use `IS NULL`, not `= NULL`.
- Use bound parameters for values in application queries.
- Use transactions for experimental writes when appropriate.
