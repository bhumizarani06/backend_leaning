const products = [
  {
    id: 1,
    name: "Laptop",
    priceCents: 50000,
    stock: 10
  },
  {
    id: 2,
    name: "Mobile",
    priceCents: 25000,
    stock: 0
  },
  {
    id: 3,
    name: "Watch",
    priceCents: 2200,
    stock: 15
  }
];
const availableproducts = products.filter(product => product.stock > 0);
console.log("availableproducts:",availableproducts);


const productSummaries = products.map(product => {
  return `${product.name} - ₹${product.priceCents / 100}`;
});

console.log("Product summaries:", productSummaries);

const cart = [
  {
    productId: 1,
    quantity: 2
  },
  {
    productId: 2,
    quantity: 1
  },
  {
    productId: 3,
    quantity: 5
  }
];

const cartProduct = cart.find(item => item.productId === 2);

console.log("Cart product:", cartProduct);

const hasOutOfStockProduct = products.some(product => product.stock === 0);

console.log("Has out of stock product:", hasOutOfStockProduct);

const allProductsHavePrice = products.every(product => product.priceCents > 0);

console.log("All products have price:", allProductsHavePrice);



const cartTotal = cart.reduce((total, item) => {
  const product = products.find(product => product.id === item.productId);

  return total + product.priceCents * item.quantity;
}, 0);

console.log("Cart total in cents:", cartTotal);
console.log("Cart total in rupees:", cartTotal / 100);

const sortedProducts = [...products];

sortedProducts.sort((a, b) => a.priceCents - b.priceCents);

console.log("Sorted products:", sortedProducts);

console.log("Original products:", products);