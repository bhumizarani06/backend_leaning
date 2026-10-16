



SELECT name, price FROM products;


SELECT name, price FROM products WHERE price < 50;


SELECT name, price FROM products WHERE category = 'Bakery';


SELECT name, price, stock
FROM products
WHERE price < 100 AND stock > 10;


SELECT name, category
FROM products
WHERE category = 'Dairy' OR category = 'Drinks';

SELECT name, price FROM products ORDER BY price ASC;

SELECT name, price FROM products ORDER BY price DESC;

SELECT name, price FROM products ORDER BY price ASC LIMIT 3;

SELECT name, stock FROM products WHERE stock = 0;

SELECT name, price
FROM products
WHERE price BETWEEN 30 AND 100;

SELECT name, description FROM products WHERE description IS NULL;

SELECT name, description FROM products WHERE description IS NOT NULL;

SELECT id, name FROM products WHERE name = 'NoSuchProduct';


SELECT COUNT(*) AS total_products FROM products;


INSERT INTO products (name, category, price, stock, description)
VALUES ('T39-Test-Insert', 'Testing', 10.00, 1, 'Temporary test row');

SELECT id, name, price
FROM products
WHERE name = 'T39-Test-Insert';


UPDATE products
SET price = 12.00
WHERE name = 'T39-Test-Insert';


SELECT id, name, price
FROM products
WHERE name = 'T39-Test-Insert';


DELETE FROM products
WHERE name = 'T39-Test-Insert';


SELECT id, name
FROM products
WHERE name = 'T39-Test-Insert';
