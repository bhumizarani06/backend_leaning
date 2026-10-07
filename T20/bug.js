function calcTotal(price,quantity){
    return price * quantity
}

function createOrder(){
    const price = 100;
    const quantity= 5;

    const total = calcTotal(price,quantity);

    console.log("price:",price);
    console.log("quantity:",quantity);
    console.log("total:",total);

    if(total !== 500){
        throw new Error("incorrect total calculation");

    }
}

createOrder();