const { getSortedProducts } = require("./products-sort");
const pool = require("./db");

async function testSorting() {
    try {
const products = await getSortedProducts("price", "SIDEWAYS");
        console.table(products);
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await pool.end();
    }
}

testSorting();