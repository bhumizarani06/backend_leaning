
USE t40_reporting;

-- Report 1: All customer orders
SELECT
    c.customer_name,
    p.product_name,
    o.quantity,
    p.price,
    o.quantity * p.price AS total_amount,
    o.order_date
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN products p ON o.product_id = p.product_id
ORDER BY o.order_date;

-- Report 2: Total spending per customer
SELECT
    c.customer_name,
    SUM(o.quantity * p.price) AS total_spending
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN products p ON o.product_id = p.product_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spending DESC;

-- Report 3: Customers with spending above 1000
SELECT
    c.customer_name,
    SUM(o.quantity * p.price) AS total_spending
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN products p ON o.product_id = p.product_id
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.quantity * p.price) > 1000
ORDER BY total_spending DESC;

-- Report 4: All customers, including customers without orders
SELECT
    c.customer_name,
    o.order_id,
    o.order_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
ORDER BY c.customer_id;

-- Report 5: Number of orders per customer
SELECT
    c.customer_name,
    COUNT(o.order_id) AS total_orders
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_orders DESC;

-- Report 6: Average and highest product price
SELECT
    category,
    AVG(price) AS average_price,
    MAX(price) AS highest_price
FROM products
GROUP BY category;

-- Report 7: Lowest and total product prices by category
SELECT
    category,
    MIN(price) AS lowest_price,
    SUM(price) AS total_price
FROM products
GROUP BY category;

-- Report 8: Product price categories
SELECT
    product_name,
    price,
    CASE
        WHEN price >= 10000 THEN 'Expensive'
        WHEN price >= 100 THEN 'Medium'
        ELSE 'Cheap'
    END AS price_category
FROM products;

-- Report 9: Unique customer cities
SELECT DISTINCT city
FROM customers
ORDER BY city;

-- Report 10: Orders in October 2026
SELECT
    order_id,
    customer_id,
    product_id,
    quantity,
    order_date
FROM orders
WHERE order_date >= '2026-10-01'
  AND order_date < '2026-11-01'
ORDER BY order_date;
