const products = [

{

    id: 1,

    name: "Laptop",

    priceCents: 50000,

    stock: 10

},

{

   id: 2,

   name: "mobile",

   priceCents: 25000,

   stock: 5

},

{

    id: 3,

    name: "watch",

    priceCents: 2200,

    stock: 15

}

];

console.log(products);

console.log(products[0].name);

console.log(products[1].priceCents);

console.log(products[0]["name"]);

console.log(products[1]["priceCents"]);

const cart = [

  {

    productId: 1,

    quantity: 2

  },

  {

    productId: 2,

    quantity: 1

  }

];

cart.push({

  productId: 3,

  quantity: 1

});

console.log(cart);

console.log(products);

cart[2].quantity = 5;

console.log(cart);

cart.splice(0, 1);

console.log(cart);

const Originalproduct = products[0];

const copiedproduct = {...Originalproduct};

console.log(Originalproduct);

console.log(copiedproduct);

console.log(Originalproduct === copiedproduct);

copiedproduct.stock = 5;

console.log("Copied stock:", copiedproduct.stock);

console.log("Original stock:", Originalproduct.stock);

const { id, name, priceCents, stock } = Originalproduct;

console.log(id);

console.log(name);

console.log(priceCents);

console.log(stock);

// Object destructuring

const {
  id: productId,
  name: productName,
  priceCents: productPrice,
  stock: productStock
} = Originalproduct;

console.log("ID:", productId);

console.log("Name:", productName);

console.log("Price:", productPrice);

console.log("Stock:", productStock);


// Array destructuring

const numbers = [10, 20, 30];

const [first, second, third] = numbers;

console.log("First:", first);

console.log("Second:", second);

console.log("Third:", third);

function showItems(...items) {

  console.log(items);

}

showItems("Laptop", "Mobile", "Watch");

const productWithDescription = {

  id: 4,

  name: "Headphones",

  priceCents: 4000,

  stock: 8,

  description: "Wireless headphones"

};

const productWithoutDescription = {

  id: 5,

  name: "Charger",

  priceCents: 1200,

  stock: 20

};

console.log(productWithDescription.description);

console.log(productWithoutDescription.description);

console.log(productWithDescription.description?.length);

console.log(productWithoutDescription.description?.length);

// Nullish coalescing vs logical OR

const stockValue = 0;

console.log("Using ||:", stockValue || 10);

console.log("Using ??:", stockValue ?? 10);

const description =
  productWithoutDescription.description ?? "No description available";

console.log("Description:", description);