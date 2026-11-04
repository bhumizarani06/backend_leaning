/*
const pool = require("./db");

async function testConnection()
 {
    try
    {
        const result = await pool.query("SELECT NOW()");
        console.log("Database connection successful");
        console.log("database time" + result.rows[0].now);

    }
    catch (error) 
    {
        console.error("Database connection failed:", error);
    }
    finally
    {
        await pool.end();
    }

    }
    testConnection();
    */
/*
const pool = require("./db");

    async function testConnection() 
    {
        try
        {
            const result = await pool.query("SELECT * from products");
            console.log("products fetched successfully");
            console.table(result.rows);
        }
        catch (error) 
        {
            console.error("Database connection failed:", error);
    }
    finally 
    {
        await pool.end();
    }
}
testConnection();
*/
//insert data into products table
/*
const pool = require("./db");

async function testConnection()
{
    try
    {
    const result = await pool.query("insert into products(product_name,price,stock) values($1,$2,$3) returning *",["headphones",1550,5]);
    console.log("data entered successfuly");
    
    }
    catch(error)
    {
    console.error("database connection failed:",error);
    }
    finally
    {
        await pool.end();
    }
}

testConnection();
*/
//update the data in products table
/*
const pool = require("./db");

async function testconnection()
{
    try{
        const result = await pool.query("update products  set price = $1 where product_name = $2 returning *",[52000,"mobile"]);
        console.log("data updated successfully");

    }
    catch(error)
    {
  console.log("database connected failed:",error);
    }
    finally
    {
  await pool.end();
    }
}

testconnection();
*/
//delete the data in products table
/*
const pool = require("./db");
  async function testconnection(){
    try
    {
        const result = await pool.query("delete from products where product_name= $1 returning *",["headphones"]);
     console.log("data deleted successfully");
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
*/
//connection pool

const pool = require("./db");

async function testConnection(){
    let client;
    try{
client = await pool.connect();
const result = await client.query("select * from products");
console.log("products fetched successfully");
    }
    catch(error)
    {
 console.log("database connection failed:",error);
    }
    finally
    {
  if(client)
  {
    client.release();
    console.log("client released");
  }
    }
}
testConnection();