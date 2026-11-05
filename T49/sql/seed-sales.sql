INSERT INTO sales (product_id, sale_date, quantity, unit_price)
SELECT
    p.id,
    DATE '2025-01-01' + (i % 730),
    (i % 5) + 1,
    p.price
FROM generate_series(1, 50000) AS i
JOIN products p
    ON p.id = ((i % 50000) + 1);