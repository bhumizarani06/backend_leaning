//console.log("All arguments:", process.argv);
//console.log("Quantity:", process.argv[2]);
//console.log("Type:", typeof process.argv[2]);


//const quantity = Number(process.argv[2]);

//console.log("Quantity:", quantity);
//console.log("Type:", typeof quantity);

//const quantity = Number(process.argv[2]);
//const price=100;
//const total = quantity * price;

//console.log("quantity:",quantity);
//console.log("price:",price);
//console.log("total:",total);
/*
const quantity = Number(process.argv[2]);

if(!Number.isFinite(quantity) || quantity <=0){
    console.error("Error:please enter a valid quantity.");
    process.exitCode = 1;
}
else{
    const price = 100;
    const total = quantity * price;

      console.log("Quantity:", quantity);
    console.log("Price:", price);
    console.log("Total:", total);
}
    */

const quantity = Number(process.argv[2]);
const price = Number(process.env.PRICE);

if (!Number.isFinite(quantity) || quantity <= 0) {
    console.error("Error: Please enter a valid quantity.");
    process.exitCode = 1;
} else if (!Number.isFinite(price) || price <= 0) {
    console.error("Error: Please set a valid PRICE environment variable.");
    process.exitCode = 1;
} else {
    const total = quantity * price;

    console.log("Quantity:", quantity);
    console.log("Price:", price);
    console.log("Total:", total);
}