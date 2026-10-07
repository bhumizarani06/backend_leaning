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



const spending = 30000;

if (spending >= 25000) {
    console.log("Reward applicable");
} else {
    console.log("No reward");
}

if (spending >= 100000) {
    console.log("$35 reward");
} else if (spending >= 50000) {
    console.log("$25 reward");
} else if (spending >= 25000) {
    console.log("$10 reward");
} else {
    console.log("$0 reward");
}




const spending = 0;

if (spending) {
    console.log("Spending exists");
} else {
    console.log("No spending");
}
    

const Day="Monday";
switch(Day)
{
   case "Monday":
    console.log("start of week");
    break;

    case "Friday":
      console.log("End of Week");
      break;

      default:
        console.log("normal day");
}
        

//loops

//for loop
for(i=0;i<5;i++)
{
  console.log(i)
}

//while loop
let i =0;
 while (i<5)
 {
  console.log(i);
  i++;
 }

 //for...of 

 const spending =[29000,25000,22000,12000];
 for(const amount of spending)
 {
  console.log(amount);
 }

 

 //break
  const spending =[29000,25000,22000,12000];
 for(const amount of spending)
{
  if(amount === 25000)
  {
    break;
  }
  console.log(amount);
}

//continue
const spending =[29000,25000,22000,12000];
 for(const amount of spending)
{
  if(amount === 0)
  {
    continue;
  }
  console.log(amount);
}
*/

