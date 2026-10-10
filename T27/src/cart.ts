
import { monthlyReward } from "./reward.js";

interface CartItem {
  name: string;
  priceCents: number;
  quantity: number;
}

const items: CartItem[] = [
  { name: "Apple", priceCents: 50, quantity: 4 },
  { name: "Milk", priceCents: 60, quantity: 2 },
  { name: "Bread", priceCents: 80, quantity: 1 }
];

export function calculateLineTotal(
  priceCents: number,
  quantity: number
): number {
  return priceCents * quantity;
}

export function cartTotal(cartItems: CartItem[]): number {
  return cartItems.reduce(
    (total, item) =>
      total + calculateLineTotal(item.priceCents, item.quantity),
    0
  );
}

const total = cartTotal(items);
const discount = monthlyReward(total);

console.log("Cart total in cents:", total);
console.log("Reward discount in cents:", discount);
console.log("Final total in cents:", total - discount);

const testPrice: number = 500;
const testQuantity: number = 3;

console.log(
  "Test line total:",
  calculateLineTotal(testPrice, testQuantity)
);

function getProductName(product: { name: string } | undefined): string {
  if (product === undefined) {
    return "Product not found";
  }

  return product.name;
}

console.log(
  "Product name:",
  getProductName({ name: "Laptop" })
);

console.log(
  "Missing product:",
  getProductName(undefined)
);