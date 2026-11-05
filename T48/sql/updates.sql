-- 1. Update a specific JSONB field--
BEGIN;

UPDATE products
SET metadata = jsonb_set(
    metadata,
    '{color}',
    '"Blue"'::jsonb
)
WHERE id = 1;

SELECT id, name, metadata
FROM products
WHERE id = 1;

ROLLBACK;


-- 2. Add a new JSONB key (preview only)--
SELECT
    name,
    metadata || '{"warranty": "2 years"}'::jsonb
        AS updated_metadata
FROM products
WHERE id = 1;


-- 3. Remove a JSONB key (preview only)--
SELECT
    name,
    metadata - 'processor' AS updated_metadata
FROM products
WHERE id = 1;