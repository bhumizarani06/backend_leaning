const pool = require("./db");

async function testTransaction()
 {
    const client = await pool.connect();

    try
     {
        console.log("Database client connected");

        await client.query("BEGIN");
        console.log("Transaction started");

        const result = await client.query(
            "SELECT * FROM products ORDER BY id"
        );

        console.table(result.rows);

        await client.query("COMMIT");
        console.log("Transaction committed successfully");

    } 
    catch (error)
     {
        await client.query("ROLLBACK");
        console.error("Transaction rolled back:", error.message);

    } 
    finally
     {
        client.release();
        await pool.end();
    }
}

testTransaction();