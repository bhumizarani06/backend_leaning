const pool = require("./db");
async function testRollback(){
    const connection = await pool.getConnection();
    let transactionStareted = false;

    try{
 await connection.beginTransaction();
 transactionStarted=true;

 const[products] = await connection.execute(
    "SELECT stock from products where id = ? for update",[1]
 );
 const oldStock = products[0].stock;
 console.log("stock before update:",oldStock);

 await connection.execute(
    "update products set stock= stock - 1 where id = ?",[1]
 );

    const [updated] = await connection.execute(
      "SELECT stock FROM products WHERE id = ?",
      [1]
    );

    console.log("Stock inside transaction:", updated[0].stock);
     throw new Error("Intentional error for rollback test");
    }catch(error)
    {
console.log("error:",error.message);

if(transactionStarted){
    await connection.rollback();
    transactionStarted=false;
    console.log("rollback successfull");
}
    }finally{
      connection.release();
      await pool.end();  
    }
}
testRollback();