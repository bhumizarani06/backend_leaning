# T11 - Classes

## Goal

Implement a small inventory service and understand JavaScript classes, objects, methods, `this`, inheritance, composition, closures, functional alternatives, and a cart/reward engine.

---

## 1. Topics Covered

* Objects and prototype lookup
* Classes and constructors
* Instance methods
* `this` keyword
* Regular functions vs arrow functions
* Inheritance
* Composition
* Plain functions vs classes
* Functional alternatives
* Closures
* Inventory management
* Cart and reward engine
* Error handling and testing

---

# 2. Objects and Prototype Lookup

An object stores related data as key-value pairs.

Example:

```js
const product = {
    id: 1,
    name: "Laptop",
    price: 50000
};
```

JavaScript also uses prototype lookup. If a property or method is not found directly on an object, JavaScript looks through its prototype chain.

Example:

```js
const user = {
    name: "Bhumi"
};

user.toString();
```

`toString()` is available through `Object.prototype`.

---

# 3. Classes and Constructor

A class provides a blueprint for creating objects.

```js
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
```

Creating an object:

```js
const product1 = new Product(
    1,
    "Laptop",
    50000
);
```

The constructor runs automatically when a new instance is created.

---

# 4. InventoryService

The `InventoryService` class manages product stock.

It contains three main methods:

### `getStock(productId)`

Returns the current stock without changing it.

### `reserve(productId, quantity)`

Reserves stock by decreasing the available quantity.

### `release(productId, quantity)`

Releases reserved stock by increasing the available quantity.

Example:

```text
Initial stock = 5

Reserve 2
5 - 2 = 3

Release 1
3 + 1 = 4
```

Final stock:

```text
4
```

---

# 5. Error Handling

The inventory service validates incorrect operations.

### Product not found

```text
Error: Product not found
```

### Insufficient stock

If available stock is less than requested quantity:

```text
Error: Insufficient stock
```

### Invalid quantity

Quantity must be greater than zero.

```text
Error: Quantity must be greater than 0
```

---

# 6. `this` Keyword

The `this` keyword refers to the object associated with the current method call.

Example:

```js
inventory.getStock("P001");
```

When the method is called through `inventory`, `this` refers to the `inventory` instance.

Therefore:

```js
this.products
```

refers to the products stored inside that inventory instance.

---

# 7. Method Detachment

A class method can lose its intended `this` when detached from the object.

Example:

```js
const getStock = inventory.getStock;

getStock("P001");
```

The method is no longer called through `inventory`, so the intended `this` is lost.

This can result in an error when the method tries to access:

```js
this.products
```

---

# 8. Regular Function vs Arrow Function

Regular functions can have their own `this` depending on how they are called.

Example:

```js
const user = {
    name: "Bhumi",

    regular: function () {
        console.log(this.name);
    }
};

user.regular();
```

Output:

```text
Bhumi
```

Arrow functions do not create their own `this`.

Example:

```js
const user = {
    name: "Bhumi",

    arrow: () => {
        console.log(this.name);
    }
};
```

The arrow function does not get `user` as its `this`.

---

# 9. Inheritance

Inheritance is used when one class is a specialized form of another class.

Example:

```js
class User {
    constructor(name) {
        this.name = name;
    }

    login() {
        console.log(this.name + " logged in");
    }
}

class Admin extends User {
    deleteUser() {
        console.log(this.name + " deleted a user");
    }
}
```

Relationship:

```text
Admin IS-A User
```

`Admin` inherits the `login()` method from `User`.

---

# 10. Composition

Composition is used when one object contains or uses another object.

Example:

```js
class Engine {
    start() {
        console.log("Engine started");
    }
}

class Car {
    constructor(engine) {
        this.engine = engine;
    }

    drive() {
        this.engine.start();
        console.log("Car is driving");
    }
}
```

Relationship:

```text
Car HAS-A Engine
```

Composition is often useful when we want to combine separate services or components.

---

# 11. Plain Function vs Class

A plain function is usually simpler when there is no state to maintain.

Example:

```js
function calculateTotal(price, quantity) {
    return price * quantity;
}
```

This is enough because the function simply receives input and returns output.

A class is useful when multiple methods operate on shared state.

Example:

```js
class Inventory {
    constructor(stock) {
        this.stock = stock;
    }

    getStock() {
        return this.stock;
    }

    reserve(quantity) {
        this.stock -= quantity;
    }

    release(quantity) {
        this.stock += quantity;
    }
}
```

The inventory has state, and multiple methods modify that state.

---

# 12. Functional Alternative

A functional version of the inventory service was also implemented.

Example:

```js
function createInventoryService(products) {
    return {
        getStock(productId) {
            // get stock
        },

        reserve(productId, quantity) {
            // reserve stock
        },

        release(productId, quantity) {
            // release stock
        }
    };
}
```

This provides similar functionality without using a class.

---

# 13. Closure

A closure occurs when an inner function remembers variables from its outer function.

Example:

```js
function createInventoryService(products) {
    return {
        getStock(productId) {
            // products is remembered here
        }
    };
}
```

The returned method can still access `products` even after `createInventoryService()` has finished executing.

Simple definition:

```text
Closure = A function remembers variables from its surrounding scope.
```

---

# 14. Cart and Reward Engine

The mini-project implements a simple cart and reward engine.

The cart accepts:

* Product ID
* Quantity
* Product price
* Monthly eligible spend

Product prices are stored as integer cents.

Example:

```text
50 cents = $0.50
60 cents = $0.60
80 cents = $0.80
```

Using integer cents avoids floating-point money calculation problems.

---

# 15. Products

Example products:

```js
const products = {
    apple: 50,
    milk: 60,
    bread: 80
};
```

The values represent cents.

```text
apple = 50 cents
milk = 60 cents
bread = 80 cents
```

---

# 16. Adding Products to Cart

Products are added using:

```js
addToCart(cart, productId, quantity);
```

Example:

```js
addToCart(cart, "apple", 2);
addToCart(cart, "milk", 1);
```

The cart becomes:

```text
[
    { productId: "apple", quantity: 2 },
    { productId: "milk", quantity: 1 }
]
```

---

# 17. Subtotal Calculation

The subtotal is calculated using:

```text
price × quantity
```

Example:

```text
Apple:
50 × 2 = 100 cents

Milk:
60 × 1 = 60 cents

Subtotal:
100 + 60 = 160 cents
```

Therefore:

```text
Subtotal = 160 cents
```

---

# 18. Monthly Reward Rules

The monthly eligible spend determines the discount.

| Monthly Eligible Spend | Discount |
| ---------------------- | -------: |
| Less than $250         |       $0 |
| $250 - $499.99         |      $10 |
| $500 - $999.99         |      $25 |
| $1000 or more          |      $35 |

The values are stored as cents:

```text
$250  = 25000 cents
$500  = 50000 cents
$1000 = 100000 cents
```

The reward is non-cumulative.

For example:

```text
$1000 spend → $35 reward
```

It does not mean:

```text
$10 + $25 + $35
```

---

# 19. Payable Total

The calculation is:

```text
Payable Total = Subtotal - Discount
```

The subtotal, discount, and payable total are kept as separate values.

No tax is applied at this stage.

`Math.max()` is used to prevent a negative payable total.

Example:

```js
function calculatePaybleTotal(subtotal, discount) {
    return Math.max(0, subtotal - discount);
}
```

---

# 20. Tests Performed

The following tests were performed:

### Test 1 - Normal Cart

```text
Apple × 2
Milk × 1

Subtotal = 160 cents
Discount = 0 cents
Payable = 160 cents
```

### Test 2 - $250 Reward

```text
Monthly Spend = 25000 cents
Discount = 1000 cents
```

### Test 3 - $500 Reward

```text
Monthly Spend = 50000 cents
Discount = 2500 cents
```

### Test 4 - $1000 Reward

```text
Monthly Spend = 100000 cents
Discount = 3500 cents
```

### Test 5 - Multiple Products

```text
Apple × 3 = 150 cents
Milk × 2 = 120 cents
Bread × 1 = 80 cents

Subtotal = 350 cents
```

### Test 6 - Invalid Product

Input:

```text
phone
```

Output:

```text
Error: Product not found: phone
```

### Test 7 - Invalid Quantity

Input:

```text
quantity = 0
```

Output:

```text
Error: Quantity must be greater than 0
```

### Test 8 - Complete Cart + Reward

The complete flow was tested:

```text
Cart
  ↓
Subtotal
  ↓
Monthly Eligible Spend
  ↓
Discount
  ↓
Payable Total
```

---

# 21. How to Run

Open the terminal inside the `T11` folder.

Run the classes examples:

```bash
node classes.js
```

Run the cart and reward engine:

```bash
node cart.js
```

Both commands should execute without errors after all tests pass.

---

# 22. Conclusion

T11 demonstrated how JavaScript classes can be used to manage shared state through constructors and instance methods.

It also demonstrated:

* `this` and method binding
* Prototype lookup
* Inheritance
* Composition
* Functional alternatives
* Closures
* Error handling
* Testing
* Integer-cent money calculations
* Cart and reward calculation

The main rule learned is:

```text
Use a plain function for simple stateless operations.

Use a class when multiple methods need to work with shared state.

Use composition when an object HAS-A or USES another object.

Use inheritance when one type IS-A specialized version of another.
```
