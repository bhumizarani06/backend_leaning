const pool = require("./db");

async function testconnection()
{
    try
    {
      const result = await pool.query("select current_database()");
      console.log("database connected successfully:");
      console.log("database name:",result.rows[0].current_database);
    }
    catch(error)
    {
   console.log("database connection failed:",error);
    }
    finally
    {
        await pool.end();
    }
}
testconnection();