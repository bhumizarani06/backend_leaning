# T14 - Sequential versus Concurrent Work

## Goal

Load independent datasets concurrently and understand when asynchronous work should be sequential or concurrent.

---

## Topics Covered

1. Identifying dependencies between operations
2. Sequential dependent work using `await`
3. Concurrent independent work using `Promise.all()`
4. `Promise.all()` fail-fast behavior
5. `Promise.allSettled()` result objects
6. Understanding that rejection does not automatically cancel other work
7. Comparing elapsed time
8. Bounded concurrency for large lists
9. Common mistake with `async forEach`

---

## Files

* `dependencies.js`
* `sequential.js`
* `concurrent.js`
* `promise-all.js`
* `all-settled.js`
* `timing.js`
* `bounded.js`
* `foreach-mistake.js`

---

## 1. Identifying Dependencies

Not every asynchronous operation can be executed at the same time.

Customer data and Product data are independent because neither operation requires the result of the other.

Therefore, they can be loaded concurrently.

Order data depends on the Customer ID.

Therefore, Customer data must be loaded before Order data.

### Dependency Flow

```text
Customer
   |
   v
Customer ID
   |
   v
Orders
```

---

## 2. Sequential Work

Sequential work means one operation is completed before the next operation starts.

Example:

```js
const customer = await loadCustomer();

const orders = await loadOrders(customer.id);
```

Here, `loadOrders()` depends on the Customer ID.

Therefore, the operations must run sequentially.

### Flow

```text
Load Customer
      |
      v
Customer ID
      |
      v
Load Orders
```

---

## 3. Concurrent Work

Concurrent work means independent asynchronous operations are started together.

Example:

```js
const [customers, products] = await Promise.all([
  loadCustomers(),
  loadProducts()
]);
```

Customer and Product loading are independent, so both operations can start together.

This can reduce total waiting time.

---

## 4. Promise.all()

`Promise.all()` is useful when multiple independent operations can run concurrently and the combined operation should fail if any promise rejects.

Example:

```js
const [customers, products] = await Promise.all([
  loadCustomers(),
  loadProducts()
]);
```

If all promises succeed, their results are returned.

If one promise rejects, `Promise.all()` rejects.

This behavior is called **fail-fast**.

### Example

```text
Customer -> fulfilled
Product  -> rejected
Orders   -> fulfilled

Promise.all() -> rejected
```

---

## 5. Promise.allSettled()

`Promise.allSettled()` waits for all promises to finish, whether they succeed or fail.

Example:

```js
const results = await Promise.allSettled([
  loadCustomers(),
  loadProducts(),
  loadOrders()
]);
```

Each result contains a status.

Possible statuses are:

* `fulfilled`
* `rejected`

### Example Result

```text
Customer -> fulfilled
Product  -> rejected
Orders   -> fulfilled
```

This is useful when the application needs to inspect every individual result.

---

## 6. Promise.all() vs Promise.allSettled()

| Feature                                | `Promise.all()`              | `Promise.allSettled()` |
| -------------------------------------- | ---------------------------- | ---------------------- |
| Runs operations concurrently           | Yes                          | Yes                    |
| Waits for all successful operations    | Yes                          | Yes                    |
| Rejects when one promise fails         | Yes                          | No                     |
| Returns individual failure information | No, combined promise rejects | Yes                    |
| Behavior                               | Fail-fast                    | Collect all outcomes   |

### Simple Explanation

`Promise.all()` means:

> "I need all of these operations to succeed."

`Promise.allSettled()` means:

> "Tell me the result of every operation, whether it succeeded or failed."

---

## 7. Rejection Does Not Automatically Cancel Other Work

A rejection from one promise does not automatically cancel other already-running operations.

For example:

```text
Customer -> 2 seconds -> Success
Product  -> 1 second  -> Failed
Orders   -> 3 seconds -> Success
```

If Product fails, `Promise.all()` rejects.

However, Customer and Orders may continue running because they were already started.

Therefore:

> Promise rejection and cancellation are different concepts.

---

## 8. Elapsed Time Comparison

Customer loading takes approximately 2 seconds.

Product loading takes approximately 3 seconds.

### Sequential

```text
Customer = 2 seconds
Product  = 3 seconds

Total = approximately 5 seconds
```

### Concurrent

```text
Customer = 2 seconds
Product  = 3 seconds

Total = approximately 3 seconds
```

Concurrent execution can therefore reduce the total waiting time for independent operations.

Actual elapsed time may vary slightly depending on the system.

---

## 9. Bounded Concurrency

Starting a very large number of operations at once can cause resource problems.

For example:

```text
10,000 requests
      |
      v
All started together
      |
      v
Too many connections / resource usage
```

Bounded concurrency limits how many operations can run at the same time.

Example:

```text
100 tasks
Concurrency limit = 3
```

Only three tasks run at a time.

When one task finishes, another task starts.

```text
Task 1  Task 2  Task 3
   ↓       ↓       ↓
 complete complete complete
   ↓
Task 4  Task 5  Task 6
```

This provides better control when processing large lists.

---

## 10. Common Mistake: async forEach

A common mistake is expecting `forEach()` to wait for asynchronous callbacks.

### Incorrect

```js
items.forEach(async (item) => {
  await processItem(item);
});

console.log("Done");
```

The outer function does not automatically wait for all asynchronous callbacks.

Therefore, `"Done"` may be printed before all tasks finish.

---

## 11. Correct Sequential Approach

For dependent or intentionally sequential work, use `for...of` with `await`.

```js
for (const item of items) {
  await processItem(item);
}

console.log("Done");
```

The next item starts only after the previous item finishes.

---

## 12. Correct Concurrent Approach

For independent operations, use `Promise.all()` with `map()`.

```js
await Promise.all(
  items.map((item) => processItem(item))
);

console.log("Done");
```

All independent operations are started together and the program waits for all of them.

---

## 13. Reproducible Commands

Run these commands from the `T14` directory:

```powershell
node dependencies.js
node sequential.js
node concurrent.js
node promise-all.js
node all-settled.js
node timing.js
node bounded.js
node foreach-mistake.js
```

---

## 14. Verification

### Dependencies

Customer and Product data are independent.

Order data depends on Customer ID.

### Sequential Work

Dependent operations are executed using sequential `await`.

### Concurrent Work

Independent Customer and Product operations are started together using `Promise.all()`.

### Fail-Fast

`Promise.all()` rejects when one of its promises rejects.

### Collecting Failures

`Promise.allSettled()` returns the individual result of every promise.

### Cancellation

A rejected promise does not automatically cancel other already-running operations.

### Timing

Independent operations can finish faster when started concurrently.

### Bounded Concurrency

Large lists should not always be launched all at once. A concurrency limit can control the number of active operations.

### async forEach

`async forEach` should not be used when the outer function needs to wait for all asynchronous operations.

---

## 15. Final Understanding

The main rule learned in T14 is:

```text
Independent operations
        |
        v
Start concurrently
        |
        v
Promise.all() / Promise.allSettled()


Dependent operations
        |
        v
Run sequentially
        |
        v
await
```

`Promise.all()` is fail-fast, while `Promise.allSettled()` collects every individual outcome.

A rejected promise does not automatically cancel other running operations.

For large lists, bounded concurrency should be used to prevent too many operations from running at once.
