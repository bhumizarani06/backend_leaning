
const connection = require("./db");

async function getCustomerReport() {
    try {
        const db = await connection;

        const [rows] = await db.execute(`
            SELECT
                c.customer_name,
                SUM(o.quantity * p.price) AS total_spending
            FROM orders o
            INNER JOIN customers c
                ON o.customer_id = c.customer_id
            INNER JOIN products p
                ON o.product_id = p.product_id
            GROUP BY c.customer_id, c.customer_name
            ORDER BY total_spending DESC
        `);

        console.table(rows);
    } catch (error) {
        console.error("Report failed:", error.message);
    } finally {
        const db = await connection;
        await db.end();
    }
}

getCustomerReport();
