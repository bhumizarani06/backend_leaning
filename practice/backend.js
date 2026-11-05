/*
console.log("bhumi");
console.log("icecream");
console.log(12 *5);

function customerTest()
{
    let customerName = "bhumi";
    let ProductName = "icecream";
    const quantity=2;
    let isAvailable=true;
    const priceCents=1250;
}
const quantity = 5;
console.log(quantity);
const priceCents=200;

console.log(priceCents);

let name="bhumi";

let age=23;

let isavailable = true;

let skills = [ "java","cde","sdf"];

let data = "";

let obj = null;

console.log(typeof name);
console.log(typeof age);
console.log(typeof isavailable);
console.log(typeof skills);
console.log(typeof data);
console.log(typeof obj);


console.log("10"+2);
console.log("10" - 2);
console.log("10" === 10);
console.log(10 % 3);
console.log(0.1 + 0.2);


*/
const rawQuantity = "abc"

const results = Number(rawQuantity);
      if(!Number.isSafeInteger(results)|| rawQuantity<=0)
      {

    throw new Error("not valid");
}
console.log(results);