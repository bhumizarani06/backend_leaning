EXPLAIN ANALYZE
SELECT *
FROM products
WHERE LOWER(name) = 'laptop';