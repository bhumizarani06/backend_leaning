-- T43: MySQL query performance benchmarks
USE t43_benchmark;

-- Verify seeded row count
SELECT COUNT(*) AS total_products
FROM products;

-- Verify category distribution
SELECT category, COUNT(*) AS product_count
FROM products
GROUP BY category
ORDER BY product_count DESC;

-- Query 1: Books before/after index comparison
EXPLAIN ANALYZE
SELECT id, sku, name, category, price
FROM products
WHERE category = 'Books'
  AND price < 2000;

-- Query 2: Electronics selectivity comparison
EXPLAIN ANALYZE
SELECT id, sku, name, category, price
FROM products
WHERE category = 'Electronics'
  AND price < 2000;

-- Verify final indexes
SHOW INDEX FROM products;
