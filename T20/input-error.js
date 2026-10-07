function calcTotal(price,quantity){
    if ( typeof price !== "number" || typeof quantity !== "number"){
         throw new Error("price and quantity must be numbers");

    }
    if(price < 0 || quantity < 0){
        throw new Error("price and quantity can't be negeative");

    }
    return price * quantity;
}

function processProduct(price,quantity){
    try{

        const total = calcTotal(price,quantity);
        console.log("product processed successfully");
        console.log("total:",total);

    }catch(error)
    {
        console.log("input error:",error.message);

    }
}processProduct(100, 5);

processProduct("100", 5);

processProduct(-100, 5);

console.log("Server can continue running...");