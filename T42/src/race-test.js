const pool = require("./db");
const { placeOrder } = require("./order");

async function main(){
    try{

    const results = await Promise.allSettled([
        placeOrder("buyer A",4,1),
        placeOrder("buyer B",4,1),
    ]);
    results.forEach((result,index) =>{
 const buyer = index === 0 ? "buyer A" : "buyer B";

 if(result.status === "fulfiled")
 {
    console.log(`${buyer} SUCCESS:`,result.value);

 }
 else{
    console.log(`${buyer} failed:`,result.reason.message);
 }
    })

    }finally{
        await  pool.end();
    }
}
main();