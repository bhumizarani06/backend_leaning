/*
const customerName = "Bhumi";
const productName = "Laptop";
const priceCents = 50000;

let quantity = 2;

console.log("Before:", quantity);

quantity = 5;

console.log("After:", quantity);

const name = "Bhumi";
const price = 50000;
const available = true;
let discount;
const noValue = null;
const bigNumber = 12345678901234567890n;
const uniqueId = Symbol("id");

console.log(name);
console.log(price);
console.log(available);
console.log(discount);
console.log(noValue);
console.log(bigNumber);
console.log(uniqueId);

console.log(typeof "Bhumi");
console.log(typeof true);
console.log(typeof null);
console.log(typeof false);



const product = {
  name: "Laptop",
  price: 50000
};

console.log(typeof product);

const Total = priceCents * quantity;
console.log(Total);




console.log(5===10);
console.log(5!=5);
console.log(5>10);

const isAvailable = true;
uantity = 2;

console.log(isAvailable && quantity > 0);


console.log("----- Bill -----");

const customerName = "Bhumi";
const productName = "Laptop";
const priceCents = 50000;
const quantity = 2;
const isAvailable = true;

const lineTotalCents = priceCents * quantity;

console.log("Customer:", customerName);
console.log("Product:", productName);
console.log("Price:", priceCents);
console.log("Quantity:", quantity);
console.log("Available:", isAvailable);
console.log("Total:", lineTotalCents);

console.log("----- Equality -----");

console.log(5 === 5);
console.log(5 === "5");

console.log(5 == 5);
console.log(5 == "5");

console.log("----number conversion---");

const rawQuantity = "3";
const quantity = Number(rawQuantity);
console.log(quantity);
console.log(typeof quantity);
 

console.log("----quantity validation--");

const rawQuantity = "0";

if(rawQuantity.trim() === "")
{
  console.log("quantity is required");

}
else{
  const quantity=Number(rawQuantity);
   if(!Number.isFinite(quantity))
    {
      console.log("invalid quantity");

    }
    else if(quantity <=0)
      {
        console.log("quantity must be grater than 0");
      } 
      else{
        console.log("valid quantity:" ,quantity);

      }
}
      
     console.log("----String vs number----");

     const a="2";
     const b=3;

     console.log(a+b);
     console.log(Number(a) + b);

     const x =2;
     const y =3;
     console.log(x+y);



console.log("-----const and object----");
const ProductInfo ={
  name:"laptop",
  price:50000
};
console.log(ProductInfo);
ProductInfo.name="mobile";
console.log(ProductInfo);

*/
console.log("----- Final Quantity Check -----");

const rawQuantityInput = "3";

if (rawQuantityInput.trim() === "") {
  console.log("Quantity is required");
} else {
  const quantity = Number(rawQuantityInput);

  if (!Number.isFinite(quantity)) {
    console.log("Invalid quantity");
  } else if (quantity <= 0) {
    console.log("Quantity must be greater than 0");
  } else {
    console.log("Valid quantity:", quantity);

    const priceCents = 50000;
    const lineTotalCents = priceCents * quantity;

    console.log(`Total bill: ${lineTotalCents} cents`);
  }
}