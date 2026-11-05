EXPLAIN ANALYZE
SELECT
    DATE_TRUNC('month', sale_date) AS sales_month,
    SUM(quantity * unit_price) AS total_revenue,
    COUNT(*) AS total_sales
FROM sales
WHERE sale_date >= DATE '2025-01-01'
  AND sale_date < DATE '2025-02-01'
GROUP BY DATE_TRUNC('month', sale_date)
ORDER BY sales_month;