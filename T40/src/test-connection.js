
const connection = require("./db");

async function testConnection() {
    try {
        const db = await connection;

        const [rows] = await db.execute(
            "SELECT DATABASE() AS database_name"
        );

        console.log("MySQL connected successfully!");
        console.log("Database:", rows[0].database_name);

        await db.end();
    } catch (error) {
        console.error("Connection failed:", error.message);
    }
}

testConnection();
