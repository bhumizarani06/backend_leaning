# T09 - References

## Goal

Build a cart factory with private state and understand JavaScript references, closures, shallow copies, nested object copies, mutation, and pure functions.

## Concepts Learned

* Primitive values vs object references
* Private state
* Lexical scope
* Closures
* Shallow copy
* Nested object copying
* Defensive copies
* Mutation
* Pure functions

## 1. Cart Factory and Private State

Created a `createCart()` factory function.

```js
function createCart() {
  const items = [];

  return {
    addItem(item) {
      items.push(item);
    },

    removeItem(productId) {
      const index = items.findIndex(
        item => item.productId === productId
      );

      if (index !== -1) {
        items.splice(index, 1);
      }
    },

    getItems() {
      return items.map(item => ({ ...item }));
    }
  };
}
```

The `items` array is private because it exists inside the factory scope.

The returned methods can still access it because of a closure.

## 2. Independent Carts

Two carts were created:

```js
const cart1 = createCart();
const cart2 = createCart();
```

Cart 1 and Cart 2 have separate private `items` arrays.

Verified output:

```text
cart1: [ { productId: 2, name: 'mobile', quantity: 4 } ]

cart2: [ { productId: 3, name: 'watch', quantity: 6 } ]
```

Changing one cart does not affect the other.

## 3. Direct Reference Bug

Initially, `getItems()` returned:

```js
getItems() {
  return items;
}
```

This returned the actual private array reference.

External code could then modify the internal cart:

```js
const externalItems = cart1.getItems();

externalItems.push({
  productId: 99,
  name: "Hacked Product",
  quantity: 1
});
```

The internal cart was changed accidentally.

This demonstrates why returning private arrays directly is unsafe.

## 4. Defensive Array Copy

The problem was fixed using:

```js
getItems() {
  return [...items];
}
```

This created a new array.

After external `push()`, the internal array remained unchanged.

## 5. Nested Shallow-Copy Bug

The spread operator only creates a shallow copy.

With:

```js
return [...items];
```

the array is new, but the objects inside it still have the same references.

Example:

```text
Original array → [ object ]
                   ↑
Copied array   → [ object ]
```

Changing a nested object's property could therefore change the original object.

The bug was demonstrated by changing:

```js
copiedItems[0].quantity = 100;
```

The internal cart initially changed to quantity `100`.

## 6. Nested Copy Fix

The nested object reference problem was fixed with:

```js
getItems() {
  return items.map(item => ({ ...item }));
}
```

Now:

* A new array is returned.
* Each item object is also copied.
* External changes do not modify the internal cart.

Verified output:

```text
Cart 1 after nested mutation:
[ { productId: 2, name: 'mobile', quantity: 4 } ]
```

The quantity remained `4` instead of changing to `100`.

## 7. Pure Function

Created a function that returns a new object instead of modifying the original:

```js
function addQuantity(item, amount) {
  return {
    ...item,
    quantity: item.quantity + amount
  };
}
```

Input:

```text
Original item:
{ productId: 10, name: 'Keyboard', quantity: 2 }
```

Output:

```text
Updated item:
{ productId: 10, name: 'Keyboard', quantity: 5 }
```

The original item remained unchanged.

## Mutation vs Pure Function

A mutating function changes the original object or array.

A pure-style function returns a new value without changing its input.

Using copies helps prevent accidental state changes.

## How to Run

From the T09 folder:

```bash
node references.js
```

## Verification

The following were successfully verified:

```text
Two carts remain independent.
Direct array mutation was demonstrated.
Defensive array copy prevented external array mutation.
Nested shallow-copy bug was demonstrated.
Nested object copying fixed the bug.
Pure function preserved the original object.
```

## Result

T09 - References task completed and verified successfully.
