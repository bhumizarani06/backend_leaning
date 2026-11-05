const { placeOrder } = require("./order");

async function runRaceTest()
{
 const results = await Promise.allSettled([
    placeOrder("customerr A"),
    placeOrder("customer B"),
 ]);
 
 results.forEach((result,index) =>
{
    if(result.status === "fulfilled")
    {
        console.log(`Customer ${index + 1}: Order successful`, result.value);

    }
    else{
        console.log(`Customer ${index + 1}: Order failed`, result.reason.message);
    }

});
}
 runRaceTest();