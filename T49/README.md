\# T49 – PostgreSQL Query Plans and Optimization



\## Objective



Learn how to analyze PostgreSQL query execution plans and optimize queries using:

\- EXPLAIN and EXPLAIN ANALYZE

\- Partial indexes

\- Expression indexes

\- B-tree indexes

\- Sequential Scan, Index Scan and Bitmap Scan

\- Query performance comparison



\## Database Setup



\- Database: `t49\_query\_plans`

\- PostgreSQL: 18.6

\- Products table: 50,000 records

\- Active products: 1,000 records

\- Sales table: 50,000 records



\## 1. Products Query Optimization



\### Baseline Active Products Query



```sql

EXPLAIN ANALYZE

SELECT \*

FROM products

WHERE is\_active = TRUE;

```



Initial execution time: \*\*2.960 ms\*\*



Plan: Sequential Scan



\### Partial Index



```sql

CREATE INDEX idx\_active\_products

ON products (id)

WHERE is\_active = TRUE;

```



After creating the index and running `ANALYZE products`, the query used an Index Scan.



Execution time: \*\*0.390 ms\*\*



The partial index stores only active product rows. Its predicate matches the query condition.



\## 2. Expression Index



\### Case-insensitive Lookup



```sql

EXPLAIN ANALYZE

SELECT \*

FROM products

WHERE LOWER(name) = 'laptop';

```



Before index: 9.972 ms



\### Create Expression Index



```sql

CREATE INDEX idx\_products\_lower\_name

ON products (LOWER(name));

```



After index: 2.724 ms



Actual matching rows: 500



Plan: Bitmap Heap Scan with Bitmap Index Scan.



The index supports the `LOWER(name)` expression used in the query.



\## 3. Sales Table



```sql

CREATE TABLE sales (

&#x20;   id SERIAL PRIMARY KEY,

&#x20;   product\_id INTEGER REFERENCES products(id),

&#x20;   sale\_date DATE NOT NULL,

&#x20;   quantity INTEGER NOT NULL CHECK (quantity > 0),

&#x20;   unit\_price NUMERIC(10,2) NOT NULL

);

```



Inserted 50,000 sample sales records using `generate\_series()`.



\## 4. Monthly Sales Report



```sql

EXPLAIN ANALYZE

SELECT

&#x20;   DATE\_TRUNC('month', sale\_date) AS sales\_month,

&#x20;   SUM(quantity \* unit\_price) AS total\_revenue,

&#x20;   SUM(quantity) AS total\_quantity,

&#x20;   COUNT(\*) AS total\_sales

FROM sales

GROUP BY DATE\_TRUNC('month', sale\_date)

ORDER BY sales\_month;

```



Initial execution time: 23.120 ms



Plan: Sequential Scan, HashAggregate and Sort.



The complete report needs all sales records, so a Sequential Scan is reasonable.



\## 5. Date-Filtered Sales Report



```sql

EXPLAIN ANALYZE

SELECT

&#x20;   DATE\_TRUNC('month', sale\_date) AS sales\_month,

&#x20;   SUM(quantity \* unit\_price) AS total\_revenue,

&#x20;   COUNT(\*) AS total\_sales

FROM sales

WHERE sale\_date >= DATE '2025-01-01'

&#x20; AND sale\_date < DATE '2025-02-01'

GROUP BY DATE\_TRUNC('month', sale\_date)

ORDER BY sales\_month;

```



Before index: 3.207 ms



\### Create Date Index



```sql

CREATE INDEX idx\_sales\_sale\_date

ON sales (sale\_date);

```



After running `ANALYZE sales`, the query used:

\- Bitmap Index Scan

\- Bitmap Heap Scan

\- HashAggregate

\- Sort



After index: 0.872 ms



January matching records: 2,138



\## 6. Performance Comparison



| Query | Before | After |

|---|---:|---:|

| Active products | 2.960 ms | 0.390 ms |

| Case-insensitive lookup | 9.972 ms | 2.724 ms |

| January sales report | 3.207 ms | 0.872 ms |

| Full monthly report | 23.120 ms | 17.370 ms |



Note: Execution timings can vary depending on caching and system load. The full monthly report continued to use Sequential Scan after adding the date index.



\## 7. Important Commands



```sql

ANALYZE products;

ANALYZE sales;

```



`ANALYZE` updates table statistics used by the query planner.



```sql

EXPLAIN

SELECT \* FROM products;

```



Shows the estimated execution plan.



```sql

EXPLAIN ANALYZE

SELECT \* FROM products;

```



Executes the query and shows the actual execution plan and timing.



\*\*Important:\*\* EXPLAIN ANALYZE executes the SQL statement. Use caution with INSERT, UPDATE and DELETE statements.



\## 8. Key Learnings



1\. A Sequential Scan reads the table rows.

2\. An Index Scan retrieves rows through an index.

3\. A Bitmap Index Scan identifies matching rows before fetching table pages.

4\. A partial index stores only rows matching its predicate.

5\. An expression index supports queries using the indexed expression.

6\. A B-tree date index helps with selective date-range queries.

7\. An index is not always useful for queries that need most or all table rows.

8\. Query plans and actual timings should guide optimization decisions.



\## Conclusion



T49 demonstrated PostgreSQL query-plan analysis and practical query optimization using partial, expression and B-tree indexes. Before-and-after execution plans were compared to understand when indexes improve performance and when Sequential Scan remains appropriate.

