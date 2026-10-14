
import { validateProduct } from "./validate-product.js";

const validInput: unknown = {
  name: "Keyboard",
  price: 1200,
  stock: 8
};

const invalidInput: unknown = {
  name: "Mouse",
  price: "free",
  stock: 10
};

try {
  console.log("Valid product:", validateProduct(validInput));
} catch (error) {
  console.log("Validation error:", (error as Error).message);
}

try {
  console.log("Invalid product:", validateProduct(invalidInput));
} catch (error) {
  console.log("Validation error:", (error as Error).message);
}
