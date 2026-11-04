

BEGIN;


INSERT INTO products (product_name, price, stock)
VALUES
('laptop', 50000.00, 10),
('mobile', 52000.00, 8),
('keyboard', 4300.00, 9),
('mouse', 400.00, 6),
('ipad', 40450.00, 3),
('Tablet', 25000.00, 5);


INSERT INTO orders (customer_name, order_date, total_amount)
VALUES
('bhumi zarani', '2026-03-03 10:00:00', 50000.00),
('umang vaghela', '2026-03-03 09:00:00', 400.00),
('alpa bariya', '2026-03-03 07:15:00', 4300.00),
('neha mavar', '2026-03-06 06:15:56', 40450.00);

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT o.order_id, p.product_id, 1, 50000.00
FROM orders o
JOIN products p ON p.product_name = 'laptop'
WHERE o.customer_name = 'bhumi zarani';

COMMIT;