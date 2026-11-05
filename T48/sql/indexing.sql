-- Create a GIN index on JSONB metadata
CREATE INDEX IF NOT EXISTS idx_products
ON products
USING GIN (metadata);

-- Refresh table statistics
ANALYZE products;

-- Check query execution plan
EXPLAIN ANALYZE
SELECT *
FROM products
WHERE metadata @> '{"color": "Black"}'::jsonb;

-- Compare with sequential scan
SET enable_indexscan = OFF;
SET enable_bitmapscan = OFF;

EXPLAIN ANALYZE
SELECT *
FROM products
WHERE metadata @> '{"color": "Black"}'::jsonb;

-- Restore normal planner settings
RESET enable_indexscan;
RESET enable_bitmapscan;