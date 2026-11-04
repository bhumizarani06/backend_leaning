const { getALLProducts, getProductById } = require("./products");
const pool = require("./db");

async function compareAPI() {
    try {
        const products = await getALLProducts();

        console.log("PostgreSQL - Get All Products:");
        console.log(JSON.stringify(products, null, 2));

        const product = await getProductById(1);

        console.log("PostgreSQL - Get Product By ID:");
        console.log(JSON.stringify(product, null, 2));

    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await pool.end();
    }
}

compareAPI();