-- 1. Check metadata must be a JSON object--
SELECT
    id,
    name,
    jsonb_typeof(metadata) AS metadata_type
FROM products
LIMIT 5;


-- 2. Check color field type--
SELECT
    id,
    name,
    jsonb_typeof(metadata -> 'color') AS color_type
FROM products
WHERE metadata ? 'color'
LIMIT 5;


-- 3. Check table constraints--
SELECT
    conname,
    pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'products'::regclass;


-- 4. Check total products--
SELECT COUNT(*) AS total_products
FROM products;