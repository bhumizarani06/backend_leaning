\# T43 — MySQL Indexing and Query Performance



\## Objective

Seed 50,000 synthetic products, compare query execution plans, evaluate a composite index, and document index trade-offs.



\## Environment

\- Database: `t43\_benchmark`

\- Table: `products`

\- Rows seeded: 50,000

\- Database: MySQL 8.0

\- Seed strategy: 1,000 rows per batch

\- Category distribution:

&#x20; - Electronics: 25,000

&#x20; - Clothing: 12,000

&#x20; - Grocery: 8,000

&#x20; - Furniture: 3,000

&#x20; - Books: 2,000



\## Queries Tested



\### Books query

```sql

SELECT id, sku, name, category, price

FROM products

WHERE category = 'Books'

&#x20; AND price < 2000;

```



Before indexing, `EXPLAIN` reported a full table scan (`type = ALL`, `key = NULL`). `EXPLAIN ANALYZE` showed 50,000 rows scanned and approximately 32.1 ms actual execution time.



After creating the composite index, the plan used an index range scan on `idx\_category\_price`. It returned 2,000 rows, with the reported actual timing ending at approximately 3.66 ms.



\### Electronics query

```sql

SELECT id, sku, name, category, price

FROM products

WHERE category = 'Electronics'

&#x20; AND price < 2000;

```



The observed plan still used a table scan, scanning 50,000 rows and returning 25,000 rows. The reported actual timing was approximately 16.5 ms. Since many rows matched, MySQL chose a table scan for this run.



Timings are observations from individual runs and may vary with cache state and server load.



\## Composite Index



```sql

CREATE INDEX idx\_category\_price

ON products (category, price);

```



The equality filter on `category` comes first, followed by the range filter on `price`. The composite index can support searches on `category` alone because it is the leftmost column, as well as searches using both columns.



\## Redundant Index Experiment



A temporary index was created for demonstration:



```sql

CREATE INDEX idx\_category\_only

ON products (category);

```



It was then removed:



```sql

DROP INDEX idx\_category\_only ON products;

```



The standalone `category` index was redundant for the tested access patterns because `idx\_category\_price` already starts with `category`. The extra index would consume storage and require additional maintenance on writes.



\## Write Overhead



Indexes can speed up reads, but MySQL must maintain them when rows are inserted, updated, or deleted. Extra indexes consume storage and can increase write costs. Keep indexes that support real query patterns; avoid adding indexes without evidence.



\## Final Indexes



\- `PRIMARY` on `id`

\- Unique index on `sku`

\- `idx\_category\_price` on `(category, price)`



\## Reproducibility



Check the data count and indexes:



```sql

SELECT COUNT(\*) AS total\_products FROM products;

SHOW INDEX FROM products;

```



Refresh statistics and inspect the query plan:



```sql

ANALYZE TABLE products;



EXPLAIN ANALYZE

SELECT id, sku, name, category, price

FROM products

WHERE category = 'Books'

&#x20; AND price < 2000;

```



The seed script stops if the table already contains rows, avoiding duplicate seeding.



