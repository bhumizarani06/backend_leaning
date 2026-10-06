const products={
apple:50,
milk:60,
bread:80

};
console.log(products);
/*
function addToCart(cart,productId,quantity)
{
    cart.push({
        productId,quantity
    });
}
    */
function addToCart(cart, productId, quantity) {
    if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
    }

    cart.push({
        productId,
        quantity
    });
}

const cart=[];
addToCart(cart,"apple",2);
addToCart(cart,"milk",1);

console.log("cart:",cart);

function calculatesubtotal(cart){
    let subtotal=0;

    for(const item of cart){
       // const price = products[item.productId];
        //subtotal+=price *item.quantity;
     const price = products[item.productId];

if (price === undefined) {
    throw new Error(`Product not found: ${item.productId}`);
}

subtotal += price * item.quantity;
    }
    return subtotal;

}
const subtotal = calculatesubtotal(cart);
console.log("subtotal:",subtotal,"cents");

function calculateReward(monthlyEligiblespend){
    if(monthlyEligiblespend >= 100000)
    {
        return 3500;
    }

 if (monthlyEligiblespend >= 50000){
    return 2500;
 }
    
    if(monthlyEligiblespend >= 25000){
        return 1000;
    }
    return 0;
}

console.log("reward of $200:",calculateReward(200000));
console.log("Reward for $200:", calculateReward(20000));
console.log("Reward for $300:", calculateReward(30000));
console.log("Reward for $700:", calculateReward(70000));
console.log("Reward for $1200:", calculateReward(120000));

function calculatePaybleTotal(subtotal,discount){
    return Math.max(0,subtotal - discount);
}

const monthlyEligiblespend = 30000;

const discount = calculateReward(monthlyEligiblespend);

const paybleTotal = calculatePaybleTotal(subtotal,discount);

console.log("subtotal:",subtotal,"cents");
console.log("discount:",discount,"cents");
console.log("payable total:",paybleTotal,"cents");

console.log("\n--- Test 1: Normal Cart ---");

const testCart1 = [];

addToCart(testCart1, "apple", 2);
addToCart(testCart1, "milk", 1);

const testSubtotal1 = calculatesubtotal(testCart1);
const testDiscount1 = calculateReward(20000);
const testPayable1 = calculatePaybleTotal(
    testSubtotal1,
    testDiscount1
);

console.log("Cart:", testCart1);
console.log("Subtotal:", testSubtotal1, "cents");
console.log("Discount:", testDiscount1, "cents");
console.log("Payable:", testPayable1, "cents");

console.log("\n--- Test 2: $250 Reward ---");

const testDiscount2 = calculateReward(25000);

console.log("Monthly Spend: 25000 cents");
console.log("Discount:", testDiscount2, "cents");

console.log("\n--- Test 3: $500 Reward ---");

const testDiscount3 = calculateReward(50000);

console.log("Monthly Spend: 50000 cents");
console.log("Discount:", testDiscount3, "cents");

console.log("\n--- Test 4: $1000 Reward ---");

const testDiscount4 = calculateReward(100000);

console.log("Monthly Spend: 100000 cents");
console.log("Discount:", testDiscount4, "cents");

console.log("\n--- Test 5: Multiple Products ---");

const testCart5 = [];

addToCart(testCart5, "apple", 3);
addToCart(testCart5, "milk", 2);
addToCart(testCart5, "bread", 1);

const testSubtotal5 = calculatesubtotal(testCart5);

console.log("Cart:", testCart5);
console.log("Subtotal:", testSubtotal5, "cents");

console.log("\n--- Test 6: Invalid Product ---");

const testCart6 = [];

addToCart(testCart6, "phone", 1);

try {
    calculatesubtotal(testCart6);
} catch (error) {
    console.log("Error:", error.message);
}

console.log("\n--- Test 7: Invalid Quantity ---");

const testCart7 = [];

try {
    addToCart(testCart7, "apple", 0);
} catch (error) {
    console.log("Error:", error.message);
}

console.log("\n--- Test 8: Complete Cart + Reward ---");

const testCart8 = [];

addToCart(testCart8, "apple", 3);
addToCart(testCart8, "milk", 2);
addToCart(testCart8, "bread", 1);

const testSubtotal8 = calculatesubtotal(testCart8);

const monthlySpend8 = 70000;

const testDiscount8 = calculateReward(monthlySpend8);

const testPayable8 = calculatePaybleTotal(
    testSubtotal8,
    testDiscount8
);

console.log("Cart:", testCart8);
console.log("Subtotal:", testSubtotal8, "cents");
console.log("Monthly Spend:", monthlySpend8, "cents");
console.log("Discount:", testDiscount8, "cents");
console.log("Payable Total:", testPayable8, "cents");