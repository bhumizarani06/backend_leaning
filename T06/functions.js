/*
function add(a,b)
{   
  return a +b;
}
console.log(add());


function sub(a,b)
{
    let C;
    return a-b;
}
console.log(sub(20,10));


function add(a, b) {
    return a + b;
}
const result = add(10,20);

console.log(result);

//functions

const cart = [
    {
        price: 5000,
        quantity: 2
    },
    {
        price: 7000,
        quantity: 3
    }
];

const calculateLineTotal = (price, quantity = 1) => {
    return price * quantity;
};

function calculateCartTotal(items) {
    let total = 0;

    for (const item of items) {
        total += calculateLineTotal(item.price, item.quantity);
    }

    return total;
}

console.log(calculateCartTotal(cart));

//functions arrow

const calculateLineTotal = (price, quantity = 1) => {
    return price * quantity;
};

function calculateCartTotal(items) {
    let total = 0;

    for (const item of items) {
        total += calculateLineTotal(item.price, item.quantity);
    }

    return total;
}

function calculateMonthlyReward(spendingCents) {
    if (spendingCents >= 100000) {
        return 35;
    } else if (spendingCents >= 50000) {
        return 25;
    } else if (spendingCents >= 25000) {
        return 10;
    } else {
        return 0;
    }
}

console.log(calculateLineTotal(5000, 2));
console.log(calculateLineTotal(5000));
console.log(calculateLineTotal(5000, 0));



//scopes
function scopeTest()
{
    const message ="hello from message";
    console.log(message);
}
scopeTest();



function greet()
{
    return "hello";
}

function runFunction(fn)
{
    console.log(fn());

}
runFunction(greet);


function sayHello()
{
    return "hello bhumi";
}

function executeFunction(fn){
    console.log(fn());

}
executeFunction(sayHello);

*/

/*

const calculateLineTotal = (price, quantity = 1) => {
    if (typeof price !== "number" || typeof quantity !== "number") {
        throw new Error("price and quantity must be numbers");
    }

    if (price < 0 || quantity < 0) {
        throw new Error("price and quantity can't be negative");
    }

    return price * quantity;
};

console.log(calculateLineTotal(5000, 2));
console.log(calculateLineTotal(5000));
console.log(calculateLineTotal(5000, 0));
//console.log(calculateLineTotal(-5000, 2));
//console.log(calculateLineTotal("5000", 2));
*/

function calculateMonthlyReward(spendingCents)
{
    if(spendingCents >= 100000)
    {
        return 35;
    }
    else if(spendingCents >=50000)
    {
        return 25;
    }
    else if(spendingCents>=25000)
    {
        return 10;

    }
    else{
        return 0;
    }
}
console.log(calculateMonthlyReward(24999));
console.log(calculateMonthlyReward(25000));

console.log(calculateMonthlyReward(49999));
console.log(calculateMonthlyReward(50000));

console.log(calculateMonthlyReward(99999));
console.log(calculateMonthlyReward(100000));

console.log(calculateMonthlyReward(100001));