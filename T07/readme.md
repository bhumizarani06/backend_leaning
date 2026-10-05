
# T07 - Arrays

## Goal

Represent products and a shopping cart using JavaScript arrays and objects.

## Concepts Learned

* Creating arrays
* Creating plain objects
* Array of objects
* Dot notation
* Bracket notation
* Adding items using `push()`
* Updating items
* Removing items using `splice()`
* Spread operator
* Object reference comparison
* Object destructuring
* Array destructuring
* Rest parameters
* Optional chaining
* Nullish coalescing (`??`)
* Logical OR (`||`)
* Shallow copy

## Products

Created 3 products with:

* `id`
* `name`
* `priceCents`
* `stock`

Products:

* Laptop
* Mobile
* Watch

## Shopping Cart

Created cart items with:

* `productId`
* `quantity`

Performed the following operations:

* Added a cart item
* Updated item quantity
* Removed a cart item

## Copy and Reference Verification

A product was copied using the spread operator:

```js
const copiedProduct = { ...originalProduct };
```

Reference comparison:

```js
originalProduct === copiedProduct
```

Output:

```text
Same reference: false
```

The copied product was then changed:

```text
Copied stock: 5
Original stock: 10
```

This confirms that changing the copied product did not change the original product.

## Destructuring

Object destructuring was used to extract product properties.

Array destructuring was used to extract values from an array.

## Rest Parameter

A function was created using the rest parameter:

```js
function showItems(...items) {
  console.log(items);
}
```

This allows multiple arguments to be collected into an array.

## Optional Chaining

Optional chaining was used to safely access a missing description:

```js
productWithoutDescription.description?.length
```

The result was:

```text
undefined
```

No error occurred.

## Nullish Coalescing vs Logical OR

Tested with:

```js
const stockValue = 0;
```

Logical OR:

```text
Using ||: 10
```

Nullish coalescing:

```text
Using ??: 0
```

`||` treats `0` as falsy, while `??` only uses the default value when the value is `null` or `undefined`.

## How to Run

Open the terminal inside the T07 folder and run:

```bash
node arrays.js
```

## Verification

Important output:

```text
Same reference: false
Copied stock: 5
Original stock: 10
Using ||: 10
Using ??: 0
Default description: No description available
```

These outputs verify that:

* The copied product is a separate object.
* Updating the copied product does not modify the original product.
* Optional chaining handles missing properties safely.
* `??` correctly preserves `0` as a valid value.

## Common Mistakes

### Using `||` when zero is valid

```js
stockValue || 10
```

will replace `0` with `10`.

Use:

```js
stockValue ?? 10
```

when `0` should remain valid.

### Spread operator is a shallow copy

The spread operator creates a new object, but nested objects and arrays are not deeply copied.

## Result

T07 - Arrays task completed and verified successfully.
