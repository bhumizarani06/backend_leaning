-- T41: Database Normalization
USE t40_reporting;

-- 1. Create categories table
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- 2. Create product-category mapping table
CREATE TABLE product_categories (
    product_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- 3. Verify product-category mapping
SELECT
    p.product_id,
    p.product_name,
    c.category_name
FROM product_categories AS pc
JOIN products AS p ON pc.product_id = p.product_id
JOIN categories AS c ON pc.category_id = c.category_id;

-- 4. Verify order snapshots
SELECT
    order_id,
    product_id,
    product_name_snapshot,
    product_price_snapshot
FROM orders
ORDER BY order_id;