const pool = require("./db");
async function testConnection(){
    try{
       const[rows] = await pool.query(
        "SELECT DATABASE() AS database_name"
       );
       console.log("mysql connected successfully");
       console.log("database:",rows[0].database_name);
    }catch(error)
    {
    console.log("connection failed:",error.message);
    }
    finally{
       await pool.end();
    }
}
testConnection();