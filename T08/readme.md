# T08 - map

## Goal

Filter available products, create product summaries, find cart products, calculate cart totals, and sort products by price.

## Concepts Learned

* `filter()`
* `map()`
* `find()`
* `some()`
* `every()`
* `reduce()`
* `sort()`
* Spread operator for copying arrays
* Numeric sorting
* Array mutation

## 1. Filter

Used `filter()` to select products that are in stock.

```js
const availableproducts = products.filter(
  product => product.stock > 0
);
```

The product with stock `0` was excluded.

Output:

```text
availableproducts: [
  { id: 1, name: 'Laptop', priceCents: 50000, stock: 10 },
  { id: 3, name: 'Watch', priceCents: 2200, stock: 15 }
]
```

## 2. Map

Used `map()` to transform products into display summaries.

```js
const productSummaries = products.map(product => {
  return `${product.name} - ₹${product.priceCents / 100}`;
});
```

Output:

```text
Product summaries: [ 'Laptop - ₹500', 'Mobile - ₹250', 'Watch - ₹22' ]
```

## 3. Find

Used `find()` to retrieve a cart product by product ID.

```js
const cartProduct = cart.find(
  item => item.productId === 2
);
```

Output:

```text
Cart product: { productId: 2, quantity: 1 }
```

`find()` returns the first matching element.

## 4. Some and Every

`some()` checks whether at least one item satisfies a condition.

```js
const hasOutOfStockProduct = products.some(
  product => product.stock === 0
);
```

Output:

```text
Has out of stock product: true
```

`every()` checks whether all items satisfy a condition.

```js
const allProductsHavePrice = products.every(
  product => product.priceCents > 0
);
```

Output:

```text
All products have price: true
```

## 5. Reduce

Used `reduce()` to calculate the cart total.

An explicit initial value of `0` was provided.

```js
const cartTotal = cart.reduce((total, item) => {
  const product = products.find(
    product => product.id === item.productId
  );

  return total + product.priceCents * item.quantity;
}, 0);
```

Output:

```text
Cart total in cents: 136000
Cart total in rupees: 1360
```

Using an initial value is important because the array could be empty.

## 6. Sort

`sort()` mutates the array it is called on.

Therefore, a copy was created using the spread operator:

```js
const sortedProducts = [...products];

sortedProducts.sort(
  (a, b) => a.priceCents - b.priceCents
);
```

Sorted order:

```text
Watch - ₹22
Mobile - ₹250
Laptop - ₹500
```

Original order remained:

```text
Laptop - ₹500
Mobile - ₹250
Watch - ₹22
```

This verifies that the original `products` array was not changed.

## Important Note About Sort

JavaScript's default `sort()` performs string comparison.

For numbers, use a numeric comparator:

```js
(a, b) => a - b
```

For this task:

```js
(a, b) => a.priceCents - b.priceCents
```

## Simple Loop Alternative

Array methods are convenient, but the same logic can also be written using normal loops.

For example:

```js
for (const product of products) {
  if (product.stock > 0) {
    console.log(product);
  }
}
```

The loop gives more manual control, while methods like `filter()`, `map()`, and `reduce()` make common operations shorter and easier to read.

## How to Run

Open PowerShell inside the `T08` folder and run:

```bash
node map.js
```

## Verification

Important verified output:

```text
Has out of stock product: true
All products have price: true
Cart total in cents: 136000
Cart total in rupees: 1360
```

Sorted products:

```text
Watch
Mobile
Laptop
```

Original products remained:

```text
Laptop
Mobile
Watch
```

Therefore, numeric sorting worked correctly and the original array was preserved.

## Result

T08 - map task completed and verified successfully.
