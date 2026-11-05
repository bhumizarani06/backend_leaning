CREATE INDEX idx_active_products
ON products (id)
WHERE is_active = TRUE;
