-- 1. Read JSONB value---
SELECT name, metadata -> 'color' AS color
FROM products;

-- 2. Read JSONB value as text--
SELECT name, metadata ->> 'color' AS color
FROM products;

-- 3. Filter products by color--
SELECT *
FROM products
WHERE metadata ->> 'color' = 'Black';

-- 4. Check whether a key exists--
SELECT id, name, metadata
FROM products
WHERE metadata ? 'color'
LIMIT 10;

-- 5. JSONB containment--
SELECT id, name, metadata
FROM products
WHERE metadata @> '{"color": "Black"}'::jsonb
LIMIT 10;

-- 6. Read nested JSONB fields--
SELECT
    name,
    metadata -> 'packaging' ->> 'type' AS packaging_type
FROM products
WHERE metadata -> 'packaging' ->> 'recyclable' = 'true';

-- 7. Add a key in query result (preview only)--
SELECT
    name,
    metadata || '{"warranty": "2 years"}'::jsonb
        AS updated_metadata
FROM products
WHERE id = 1;

-- 8. Remove a key in query result (preview only)--
SELECT
    name,
    metadata - 'processor' AS updated_metadata
FROM products
WHERE id = 1;

-- 9. Keep relational fields separate from JSONB--
SELECT id, name, price, stock, owner_id, metadata
FROM products
LIMIT 5;