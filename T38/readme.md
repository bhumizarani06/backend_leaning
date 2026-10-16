# T38 — SQL Schema Design

## Goal
Design a relational shop database using MySQL and practice SQL queries, relationships, and constraints.

## Database
- MySQL 8
- Database: `t38_shop`
- Storage engine: InnoDB

## Tables
- `users` — customer information
- `categories` — product categories
- `products` — product details, price, and stock
- `orders` — customer orders
- `order_items` — products included in each order

## Concepts Practiced
- Primary keys and auto-increment
- Foreign keys and composite primary keys
- `NOT NULL`, `UNIQUE`, `DEFAULT`, and `CHECK`
- `INSERT`, `SELECT`, `UPDATE`, and `DELETE`
- `ALTER TABLE`
- `INNER JOIN` and `LEFT JOIN`
- Aggregate functions: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`
- `GROUP BY` and `HAVING`
- `ORDER BY`, `LIMIT`, `LIKE`, and `IS NULL`
- `CASE WHEN`
- Transactions: `START TRANSACTION`, `COMMIT`, and `ROLLBACK`

## Verification
Verified table structures, foreign-key relationships, constraints, and sample queries using MySQL.

## Run
Execute `schema.sql` in MySQL to create the database and tables.
