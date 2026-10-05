# T10 — Exceptions, Modules and Testing

## Goal

Split calculations into separate modules and write at least 12 useful test cases.

## Prerequisite

T09 and its verification were completed before starting T10.

---

## Project Structure

```text
T10/
│
├── cart.js
├── rewards.js
├── json.js
├── test.js
├── package.json
└── readme.md
```

---

## Concepts Learned

### 1. Exceptions

JavaScript can throw an Error object when invalid input is detected.

Example:

```js
throw new Error("Price must be greater than 0");
```

`try...catch` is used when the error needs to be handled meaningfully.

Example:

```js
try {
    calculatePrice(-100, 2);
} catch (error) {
    console.log(error.message);
}
```

Errors should not be caught and converted into a valid-looking value such as `0`, because that can hide broken input.

---

### 2. JSON.parse()

`JSON.parse()` converts a JSON string into a JavaScript object.

Example:

```js
const jsonData = '{"name":"Pizza","price":200}';

const product = JSON.parse(jsonData);

console.log(product.name);
```

Output:

```text
Pizza
```

Invalid JSON can cause a `SyntaxError`, so parsing untrusted JSON may need error handling.

---

### 3. JSON.stringify()

`JSON.stringify()` converts a JavaScript object into a JSON string.

Example:

```js
const product = {
    name: "Pizza",
    price: 200
};

const jsonData = JSON.stringify(product);

console.log(jsonData);
```

Output:

```text
{"name":"Pizza","price":200}
```

JSON is useful for data exchange, but it does not preserve every JavaScript value exactly.

---

## 4. ES Modules

The project uses ES Modules.

`package.json` contains:

```json
"type": "module"
```

This allows the project to use `import` and `export`.

Example:

```js
export {
    calculatePrice,
    calculateCartTotal
};
```

Import:

```js
import {
    calculatePrice,
    calculateCartTotal
} from "./cart.js";
```

The code is split into separate modules so that each file has a clear responsibility.

* `cart.js` — cart and price calculations
* `rewards.js` — reward calculation
* `test.js` — tests
* `json.js` — JSON practice

---

## 5. Named and Default Exports

A named export is imported using curly braces.

Example:

```js
export { calculateReward };
```

Import:

```js
import { calculateReward } from "./rewards.js";
```

A default export does not require curly braces during import.

Example:

```js
export default calculateReward;
```

Import:

```js
import calculateReward from "./rewards.js";
```

---

## 6. Assertions

Node.js provides the built-in `assert` module for testing.

Import:

```js
import assert from "node:assert";
```

Example:

```js
assert.strictEqual(total, 600);
```

If the actual value and expected value are equal, the assertion passes.

If they are different, Node.js throws an `AssertionError`.

---

## 7. Arrange / Act / Assert

The tests follow the AAA pattern.

### Arrange

Prepare the input data.

```js
const price = 300;
const quantity = 2;
```

### Act

Execute the function being tested.

```js
const total = calculatePrice(price, quantity);
```

### Assert

Check that the result is correct.

```js
assert.strictEqual(total, 600);
```

The pattern is:

```text
Arrange
   ↓
Act
   ↓
Assert
```

---

# Test Cases

The project contains 12 useful test cases.

| Test | Scenario                 | Expected Result |
| ---- | ------------------------ | --------------- |
| 1    | Normal price calculation | `600`           |
| 2    | Invalid price            | Error           |
| 3    | Empty cart               | `0`             |
| 4    | Multiple items           | `160`           |
| 5    | Duplicate items          | `250`           |
| 6    | Unknown product          | Error           |
| 7    | Invalid quantity         | Error           |
| 8    | Decimal quantity         | Error           |
| 9    | Invalid price type       | Error           |
| 10   | Reward below threshold   | `0`             |
| 11   | Reward at 500 threshold  | `50`            |
| 12   | Reward at 1000 threshold | `100`           |

---

## Test Details

### Test 1 — Normal Price

Input:

```js
calculatePrice(300, 2);
```

Expected:

```text
600
```

---

### Test 2 — Invalid Price

Input:

```js
calculatePrice(-100, 2);
```

Expected error:

```text
Price must be greater than 0
```

---

### Test 3 — Empty Cart

Input:

```js
calculateCartTotal([]);
```

Expected:

```text
0
```

An empty cart is treated as a valid cart with a total of zero.

---

### Test 4 — Multiple Items

Input:

```js
calculateCartTotal([
    { product: "apple", quantity: 2 },
    { product: "milk", quantity: 1 }
]);
```

Calculation:

```text
Apple = 50 × 2 = 100
Milk  = 60 × 1 = 60

Total = 160
```

Expected:

```text
160
```

---

### Test 5 — Duplicate Items

Input:

```js
calculateCartTotal([
    { product: "apple", quantity: 2 },
    { product: "apple", quantity: 3 }
]);
```

Calculation:

```text
Apple = 50 × 2 = 100
Apple = 50 × 3 = 150

Total = 250
```

Expected:

```text
250
```

---

### Test 6 — Unknown Product

Input:

```js
calculateCartTotal([
    { product: "pizza", quantity: 1 }
]);
```

Expected error:

```text
Unknown product: pizza
```

---

### Test 7 — Invalid Quantity

Input:

```js
calculatePrice(100, 0);
```

Expected error:

```text
Quantity must be a positive integer
```

---

### Test 8 — Decimal Quantity

Input:

```js
calculatePrice(100, 1.5);
```

Expected error:

```text
Quantity must be a positive integer
```

---

### Test 9 — Invalid Price Type

Input:

```js
calculatePrice("100", 2);
```

Expected error:

```text
Price must be a valid number
```

---

### Test 10 — Reward Below Threshold

Input:

```js
calculateReward(300);
```

Expected:

```text
0
```

---

### Test 11 — Reward at 500 Threshold

Input:

```js
calculateReward(500);
```

Expected:

```text
50
```

---

### Test 12 — Reward at 1000 Threshold

Input:

```js
calculateReward(1000);
```

Expected:

```text
100
```

---

# Reward Rules

The reward logic is:

```text
Total < 500
    ↓
Reward = 0

Total >= 500 and < 1000
    ↓
Reward = 50

Total >= 1000
    ↓
Reward = 100
```

Threshold values such as `500` and `1000` are specifically tested because boundary conditions can easily contain bugs.

---

# Error Handling Rule

Invalid input should produce a meaningful error.

Bad approach:

```js
try {
    // operation
} catch (error) {
    return 0;
}
```

This can make invalid input appear valid.

Better approach:

```js
if (price <= 0) {
    throw new Error("Price must be greater than 0");
}
```

The error message explains what went wrong.

---

# Running the Tests

The complete test suite is configured in `package.json`:

```json
"scripts": {
    "test": "node test.js"
}
```

Run:

```bash
npm test
```

---

# Reproducible Input and Output

## Input

```js
calculatePrice(300, 2);

calculateCartTotal([]);

calculateCartTotal([
    { product: "apple", quantity: 2 },
    { product: "milk", quantity: 1 }
]);

calculateReward(500);

calculateReward(1000);
```

## Expected Output

```text
600
0
160
50
100
```

---

# Final Verification

Command used:

```bash
npm test
```

Actual verification output:

```text
> t10@1.0.0 test
> node test.js

Test 1 passed - normal price
Test 2 passed - invalid price
Test 3 passed - empty cart
Test 4 passed - multiple items
Test 5 passed - duplicate items
Test 6 passed - unknown product
Test 7 passed - invalid quantity
Test 8 passed - decimal quantity
Test 9 passed - invalid price type
Test 10 passed - reward below threshold
Test 11 passed - reward at 500
Test 12 passed - reward at 1000
```

## Verification Status

* Invalid input verified
* Empty cart verified
* Duplicate items verified
* Unknown product verified
* Invalid quantity verified
* Invalid price verified
* Meaningful error messages verified
* Reward thresholds verified
* 12 test cases completed
* Complete test suite runs through `npm test`
* Reproducible input and output documented

**T10 is complete.**
