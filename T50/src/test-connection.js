/*
const pool = require("../config/db");
async function testConnection()
 {
    try
    {
const result= await pool.query(
    "select current_database() as database,NOW() as connected_at"

);
console.log("succesffuly connected");
    }
    catch(err)
    {
console.log("Connection closed",err.message);
    }
    finally
    {
await pool.end();
    }
}
testConnection();
*/

const pool = require("../config/db");

async function testconnection()
{
    try{
        const result = await pool.query(
            "select * from products"
        );
console.log("products:",result.rows);
    }
    catch(err)
    {
console.log("error:",err.message);
    }
    finally{
        await pool.end();
    }
}
testconnection();


