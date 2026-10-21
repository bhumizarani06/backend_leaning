const pool = require("./db");
const { placeOrder } = require("./order");

async function main(){
    try{
        const result = await placeOrder("bhumi",1,2);
        console.log("order placed successfully");
        console.log(result);

}catch(error)
{
console.log("order failed:",error.message);

}
finally{
await pool.end();
}
}
main();