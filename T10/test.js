/*
import { calculatePrice } from "./cart.js";

try {
    const result = calculatePrice(100, 0);
    console.log("Total:", result);
} catch (error) {
    console.log("Error:", error.message);
}
    */
   /*
   import { calculatePrice } from "./cart.js";
import { calculateReward } from "./reward.js";

try {
    const price = calculatePrice(300, 2);
    console.log("Total:", price);

    const reward = calculateReward(price);
    console.log("Reward:", reward);
} catch (error) {
    console.log("Error:", error.message);
}

*/
import assert from "node:assert";

import {
    calculatePrice,
    calculateCartTotal
} from "./cart.js";

import { calculateReward } from "./reward.js";


// Test 1: Normal price calculation

// Arrange
const price = 300;
const quantity = 2;

// Act
const total = calculatePrice(price, quantity);

// Assert
assert.strictEqual(total, 600);

console.log("Test 1 passed - normal price");


// Test 2: Invalid price

// Arrange
const invalidPrice = -100;

// Act + Assert
assert.throws(
    () => calculatePrice(invalidPrice, 2),
    {
        message: "Price must be greater than 0"
    }
);

console.log("Test 2 passed - invalid price");


// Test 3: Empty cart

// Arrange
const emptyCart = [];

// Act
const emptyTotal = calculateCartTotal(emptyCart);

// Assert
assert.strictEqual(emptyTotal, 0);

console.log("Test 3 passed - empty cart");


// Test 4: Multiple items

// Arrange
const cart = [
    { product: "apple", quantity: 2 },
    { product: "milk", quantity: 1 }
];

// Act
const cartTotal = calculateCartTotal(cart);

// Assert
assert.strictEqual(cartTotal, 160);

console.log("Test 4 passed - multiple items");


// Test 5: Duplicate items

// Arrange
const duplicateCart = [
    { product: "apple", quantity: 2 },
    { product: "apple", quantity: 3 }
];

// Act
const duplicateTotal = calculateCartTotal(duplicateCart);

// Assert
assert.strictEqual(duplicateTotal, 250);

console.log("Test 5 passed - duplicate items");


// Test 6: Unknown product

// Arrange
const unknownProductCart = [
    { product: "pizza", quantity: 1 }
];

// Act + Assert
assert.throws(
    () => calculateCartTotal(unknownProductCart),
    {
        message: "Unknown product: pizza"
    }
);

console.log("Test 6 passed - unknown product");

// Test 7: Invalid quantity

assert.throws(
    () => calculatePrice(100, 0),
    {
        message: "Quantity must be a positive integer"
    }
);

console.log("Test 7 passed - invalid quantity");


// Test 8: Decimal quantity

assert.throws(
    () => calculatePrice(100, 1.5),
    {
        message: "Quantity must be a positive integer"
    }
);

console.log("Test 8 passed - decimal quantity");


// Test 9: Invalid price type

assert.throws(
    () => calculatePrice("100", 2),
    {
        message: "Price must be a valid number"
    }
);

console.log("Test 9 passed - invalid price type");


// Test 10: Reward below threshold

const reward1 = calculateReward(300);

assert.strictEqual(reward1, 0);

console.log("Test 10 passed - reward below threshold");


// Test 11: Reward at 500 threshold

const reward2 = calculateReward(500);

assert.strictEqual(reward2, 50);

console.log("Test 11 passed - reward at 500");


// Test 12: Reward at 1000 threshold

const reward3 = calculateReward(1000);

assert.strictEqual(reward3, 100);

console.log("Test 12 passed - reward at 1000");