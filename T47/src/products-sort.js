const pool = require("./db");

const allowedSortColumns = ["id", "name", "price", "category"];

async function getSortedProducts(sortBy = "id", sortOrder = "ASC") {
    if (!allowedSortColumns.includes(sortBy)) {
        throw new Error("Invalid sort column");
    }

    const order = sortOrder.toUpperCase();

    if (!["ASC", "DESC"].includes(order)) {
        throw new Error("Invalid sort order");
    }

    const result = await pool.query(
        `SELECT * FROM products ORDER BY ${sortBy} ${order}`
    );

    return result.rows;
}

module.exports = { getSortedProducts };