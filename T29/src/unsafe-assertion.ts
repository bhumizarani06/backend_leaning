
export {};

type Product = {
  name: string;
  price: number;
};

const data: unknown = {
  name: 123,
  price: "free"
};


const product = data as Product;

console.log("Product name:", product.name);
console.log("Formatted price:", product.price.toFixed(2));
