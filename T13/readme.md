# T13 — Promises

## Goal

Simulate loading products and customer data using JavaScript Promises and async/await.

## Concepts Learned

* Promise states: pending, fulfilled, rejected
* Creating Promises using `new Promise()`
* `resolve()` for successful operations
* `reject()` for failed operations
* `.then()` for successful results
* `.catch()` for rejected Promises
* `.finally()` for cleanup
* `async` functions
* `await` for waiting for Promise results
* `try/catch` for handling rejected Promises
* `finally` with async/await
* Testing both resolved and rejected behavior
* Avoiding unhandled Promise rejections

## Files

### 1. promise1.js

Basic Promise example.

The Promise is resolved with:

```text
Task completed
```

Expected output:

```text
Task completed
```

### 2. product.js

Simulates product lookup with a one-second delay.

Available products:

```text
1 - Laptop - 50000
2 - Phone - 25000
3 - Keyboard - 2000
```

The `findProduct()` function returns a Promise.

If the product exists:

```js
resolve(product);
```

If the product does not exist:

```js
reject(new Error("Product not found"));
```

The lookup is handled using:

```text
async
await
try/catch
finally
```

### Successful lookup

Input:

```text
Product ID: 1
```

Output:

```text
Looking for product...
Product: { id: 1, name: 'Laptop', price: 50000 }
Lookup finished
```

### Rejected lookup

Input:

```text
Product ID: 99
```

Output:

```text
Looking for product...
Error: Product not found
Lookup finished
```

## 3. async-await.js

Demonstrates how `async` and `await` work with Promises.

### Successful case

Output:

```text
Loading user...
User data received
User lookup finished
```

### Rejected case

Output:

```text
Loading user...
Error: user not found
User lookup finished
```

## 4. test.js

Tests both successful and rejected product lookup behavior.

Command:

```bash
node test.js
```

Actual verified output:

```text
Resolved test: PASS
{ id: 1, name: 'Laptop', price: 50000 }
Rejected test: PASS
Product not found
All tests completed
```

## Important Theory

### Promise States

A Promise has three main states:

```text
Pending
   ↓
Fulfilled
```

or:

```text
Pending
   ↓
Rejected
```

### async

An `async` function always returns a Promise.

Example:

```js
async function getData() {
    return "Data";
}
```

Even though `"Data"` is returned, the function actually returns a Promise that fulfills with `"Data"`.

### await

`await` is used inside an async function to receive the result of a Promise.

Example:

```js
const result = await getData();
```

If the Promise fulfills, the result is assigned to the variable.

If the Promise rejects, an error is thrown and can be handled using `catch`.

### try/catch

Rejected Promises can be handled using:

```js
try {
    const result = await getData();
} catch (error) {
    console.log(error.message);
}
```

### finally

`finally` runs whether the operation succeeds or fails.

```js
try {
    // operation
} catch (error) {
    // error handling
} finally {
    // cleanup
}
```

## Common Mistake

A common mistake is forgetting `await` when trying to catch a Promise rejection with `try/catch`.

Incorrect:

```js
try {
    getData();
} catch (error) {
    console.log(error);
}
```

Correct:

```js
try {
    await getData();
} catch (error) {
    console.log(error);
}
```

## Verification

The following cases were tested successfully:

* Promise resolution
* Promise rejection
* `async/await`
* `try/catch`
* `finally`
* Product found
* Product not found
* Resolved test
* Rejected test

No unhandled Promise rejection occurred during the final test.

## Conclusion

T13 demonstrated how Promises are created and handled in JavaScript. The task also showed how `async/await` provides a cleaner way to work with asynchronous operations and how `try/catch/finally` can be used for error handling and cleanup.
