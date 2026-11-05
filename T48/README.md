\# T48 – PostgreSQL JSONB



\## Overview



This project demonstrates how to store, query, update, validate, and index flexible JSON data using PostgreSQL's JSONB data type.



JSONB allows us to store semi-structured data inside a relational database while keeping important fields in normal SQL columns.



\## Database Details



\- Database: `t48\_jsonb`

\- Table: `products`

\- PostgreSQL version: 18

\- Total records: 10,003

\- Index: GIN index on the `metadata` column



\## 1. Table Structure



The `products` table contains:



| Column | Data Type | Purpose |

|---|---|---|

| id | SERIAL | Primary key |

| name | VARCHAR(100) | Product name |

| price | NUMERIC(10,2) | Product price |

| stock | INTEGER | Available stock |

| owner\_id | INTEGER | Owner reference value |

| metadata | JSONB | Flexible product attributes |



The `price` and `stock` columns have CHECK constraints to prevent negative values.



The `metadata` column has a default empty JSONB object.



\## 2. JSONB Sample Data



Example:



```json

{

&#x20; "color": "Black",

&#x20; "ram": "16GB",

&#x20; "processor": "Intel i7",

&#x20; "packaging": {

&#x20;   "type": "Box",

&#x20;   "recyclable": true

&#x20; }

}

```



JSONB is useful when different products have different attributes.



\## 3. JSON vs JSONB



\- JSON stores JSON text.

\- JSONB stores data in a decomposed binary format.

\- JSONB supports efficient indexing.

\- JSONB is generally preferred when frequent querying and filtering are required.



\## 4. Reading JSONB Data



\### Using ->



Returns a JSON value.



```sql

SELECT metadata -> 'color'

FROM products;

```



\### Using ->>



Returns a text value.



```sql

SELECT metadata ->> 'color'

FROM products;

```



\### Accessing nested JSON



```sql

SELECT metadata -> 'packaging' ->> 'type'

FROM products;

```



\## 5. Filtering JSONB Data



\### Filter by a JSONB value



```sql

SELECT \*

FROM products

WHERE metadata ->> 'color' = 'Black';

```



\### Check whether a key exists



```sql

SELECT \*

FROM products

WHERE metadata ? 'ram';

```



\### JSONB containment operator



```sql

SELECT \*

FROM products

WHERE metadata @> '{"color": "Black"}';

```



\## 6. GIN Index



Created a GIN index on the JSONB column:



```sql

CREATE INDEX idx\_products

ON products USING GIN (metadata);

```



Updated query planner statistics:



```sql

ANALYZE products;

```



GIN indexes help PostgreSQL search JSONB documents efficiently.



\### Performance comparison



Used `EXPLAIN ANALYZE` to compare indexed and sequential scan execution.



Latest observed test:



| Scan type | Execution time |

|---|---:|

| Index/Bitmap scan | 5.858 ms |

| Sequential scan | 4.371 ms |



The sequential scan was faster in this particular run. Indexes do not guarantee faster execution for every query. Performance depends on table size, data distribution, caching, and query selectivity.



\## 7. Updating JSONB Data



\### Update a single JSONB key



```sql

UPDATE products

SET metadata = jsonb\_set(

&#x20;   metadata,

&#x20;   '{color}',

&#x20;   '"Blue"'::jsonb

)

WHERE id = 1;

```



\### Add or merge a JSONB key



```sql

SELECT metadata || '{"warranty": "2 years"}'::jsonb

FROM products

WHERE id = 1;

```



\### Remove a JSONB key



```sql

SELECT metadata - 'processor'

FROM products

WHERE id = 1;

```



The merge and removal examples in this project are SELECT previews; they do not permanently modify the table.



\## 8. Transactions and ROLLBACK



Tested a JSONB update inside a transaction:



```sql

BEGIN;



UPDATE products

SET metadata = jsonb\_set(

&#x20;   metadata,

&#x20;   '{color}',

&#x20;   '"Blue"'::jsonb

)

WHERE id = 1;



ROLLBACK;

```



`ROLLBACK` restores the original value.



Verified that Laptop's color remained `Black`.



\## 9. JSONB Validation



Added a CHECK constraint:



```sql

ALTER TABLE products

ADD CONSTRAINT products\_metadata\_valid

CHECK (

&#x20;   jsonb\_typeof(metadata) = 'object'

&#x20;   AND (

&#x20;       NOT (metadata ? 'color')

&#x20;       OR jsonb\_typeof(metadata -> 'color') = 'string'

&#x20;   )

);

```



This validates that:



\- Metadata must be a JSON object.

\- If the `color` key exists, its value must be a JSON string.



Tested an invalid value:



```json

{"color": 123}

```



PostgreSQL rejected it because the CHECK constraint was violated.



\## 10. Project Files



```text

T48/

│

├── README.md

│

└── sql/

&#x20;   ├── schema.sql

&#x20;   ├── seed.sql

&#x20;   ├── queries.sql

&#x20;   ├── indexing.sql

&#x20;   ├── updates.sql

&#x20;   └── validation.sql

```



\### File descriptions



| File | Purpose |

|---|---|

| schema.sql | Creates the products table and constraints |

| seed.sql | Inserts three sample products |

| queries.sql | Demonstrates JSONB queries |

| indexing.sql | Creates GIN index and compares query plans |

| updates.sql | Demonstrates JSONB updates and rollback |

| validation.sql | Checks JSONB data types and constraints |



\*\*Important:\*\* `seed.sql` is intended for a fresh table. Do not run it again on the current populated database because it will insert duplicate sample records.



\## 11. Commands Used



Connect to database:



```powershell

\& "C:\\Program Files\\PostgreSQL\\18\\bin\\psql.exe" -U postgres -d t48\_jsonb

```



Execute SQL files:



```powershell

\& "C:\\Program Files\\PostgreSQL\\18\\bin\\psql.exe" -U postgres -d t48\_jsonb -P pager=off -f ".\\sql\\queries.sql"

```



Check product count:



```sql

SELECT COUNT(\*) FROM products;

```



Check Laptop data:



```sql

SELECT id, name, metadata

FROM products

WHERE id = 1;

```



\## 12. Final Verification



Final database verification:



\- Database: `t48\_jsonb`

\- Total products: 10,003

\- Laptop color: Black

\- GIN index: Created

\- JSONB validation constraint: Added

\- Transaction rollback: Tested successfully

\- Invalid JSONB value: Rejected successfully

\- SQL files: Created



\## Conclusion



In this task, I learned how to use PostgreSQL JSONB for flexible data storage, retrieve nested JSON values, filter JSON documents, create GIN indexes, update JSONB fields, validate JSON structures, and use transactions with ROLLBACK.



This demonstrates how PostgreSQL combines relational database features with flexible JSON document storage.

