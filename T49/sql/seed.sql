
INSERT INTO products (name, category, price, is_active)
SELECT
    CASE
        WHEN i % 300 = 0 THEN 'laptop'
        WHEN i % 200 = 0 THEN 'LAPTOP'
        WHEN i % 100 = 0 THEN 'Laptop'
        ELSE 'Product ' || i
    END,
    CASE
        WHEN i % 5 = 0 THEN 'Electronics'
        WHEN i % 5 = 1 THEN 'Clothing'
        WHEN i % 5 = 2 THEN 'Grocery'
        WHEN i % 5 = 3 THEN 'Furniture'
        ELSE 'Books'
    END,
    (i % 10000) + 100,
    (i % 50 = 0)
FROM generate_series(1, 50000) AS i;
