# T20 — Debugger, Graceful Shutdown, Product CLI & HTTP API

## Objective

The objective of T20 is to learn how to debug Node.js applications, handle recoverable and fatal errors, gracefully shut down an HTTP server, work with file-based product storage, and build a basic Product CLI and HTTP API.

This task also demonstrates why CPU-heavy operations and synchronous I/O can block Node.js request processing.

---

## Concepts Covered

* Reading and understanding stack traces
* Debugger and breakpoints
* Inspecting variables during debugging
* Step Over, Step Into and Step Out
* Recoverable input errors
* `try...catch`
* `SIGINT`
* `SIGTERM`
* Graceful server shutdown
* Stopping new traffic during shutdown
* Bounded drain period
* `server.close()`
* `server.closeAllConnections()`
* File-based JSON storage
* `fs/promises`
* Command Line Interface (CLI)
* `process.argv`
* Input validation
* HTTP API
* HTTP status codes
* Event loop blocking
* CPU-heavy synchronous work
* Synchronous vs asynchronous I/O

---

## Files

```text
T20/
│
├── bug.js
├── input-error.js
├── server.js
├── server-backup.js
├── product-cli.js
├── products.json
└── readme.md
```

---

# 1. Stack Trace Debugging

The first program contained an intentional calculation bug.

### Incorrect code

```js
return price + quantity;
```

For:

```text
price = 100
quantity = 5
```

the result became:

```text
105
```

But the expected total was:

```text
100 × 5 = 500
```

### Correct code

```js
return price * quantity;
```

### Root Cause

The bug was caused by using the addition operator (`+`) instead of the multiplication operator (`*`).

---

# 2. Debugger and Breakpoints

The Node.js debugger was used to inspect the program while it was running.

A breakpoint was placed near:

```js
const total = calculateTotal(price, quantity);
```

The following values were inspected:

```text
price = 100
quantity = 5
```

The debugger helped identify that the calculation function was using the wrong operator.

### Important debugger controls

| Key         | Purpose   |
| ----------- | --------- |
| F5          | Continue  |
| F10         | Step Over |
| F11         | Step Into |
| Shift + F11 | Step Out  |
| Shift + F5  | Stop      |

After fixing the bug:

```text
Price: 100
Quantity: 5
Total: 500
```

---

# 3. Recoverable Input Errors

Not every error should stop the entire application.

For example, a user may enter:

```text
price = "100"
```

instead of a number.

Validation was added:

```js
if (typeof price !== "number" || typeof quantity !== "number") {
    throw new Error("Price and quantity must be numbers");
}
```

Negative values were also rejected.

The error was handled using:

```js
try {
    // operation
} catch (error) {
    // handle error
}
```

This allows the application to continue running after a bad input.

### Example

```text
Product processed successfully.
Total: 500

Input error: Price and quantity must be numbers

Input error: Price and quantity cannot be negative

Server can continue running...
```

---

# 4. SIGINT and SIGTERM

Node.js applications can receive operating-system signals.

### SIGINT

Usually generated when the user presses:

```text
Ctrl + C
```

### SIGTERM

Used by operating systems, process managers, containers, and deployment systems to request that an application terminate.

Instead of immediately using:

```js
process.exit();
```

the application performs cleanup first.

---

# 5. Graceful Shutdown

The HTTP server was modified to shut down gracefully.

The shutdown process is:

```text
Shutdown signal
      ↓
Stop accepting new traffic
      ↓
Allow existing requests to finish
      ↓
Wait for bounded drain period
      ↓
Close remaining connections if necessary
      ↓
Server closed
```

The server uses:

```js
server.close()
```

to stop accepting new connections while allowing existing requests to finish.

A maximum drain period was also added.

If connections remain after the timeout:

```js
server.closeAllConnections()
```

is used to close them.

---

# 6. Bounded Drain Period

A slow endpoint was created:

```text
/slow
```

It waits for approximately 5 seconds before responding.

The shutdown logic allows existing requests to finish but does not wait forever.

The configured drain timeout is:

```js
const DRAIN_TIMEOUT_MS = 10000;
```

Therefore:

```text
Maximum drain time = 10 seconds
```

If the existing requests finish before the timeout, the server closes normally.

If connections remain, they are closed after the timeout.

Example output:

```text
Server running on http://localhost:3000

Slow request started.
Slow request completed.

SIGINT received.
Stopping new traffic...

Drain timeout reached.
Closing remaining connections.
Remaining connections closed.
Server closed.
Shutdown complete.
```

---

# 7. File-Based Product Storage

For this learning project, products are stored in:

```text
products.json
```

Example product structure:

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 50000,
  "stock": 5
}
```

This is useful for learning file handling, but a real production application should normally use a database instead of a JSON file for persistent application data.

---

# 8. Product CLI

A Command Line Interface was created using:

```text
product-cli.js
```

The CLI uses:

```js
const { readFile, writeFile } = require("fs").promises;
```

This provides asynchronous file operations.

---

## CLI Commands

### List products

```powershell
node product-cli.js list
```

Example:

```text
Products:
1. Laptop - ₹50000 - Stock: 5
2. Mobile - ₹25000 - Stock: 10
3. Watch - ₹2200 - Stock: 15
4. Keyboard - ₹1500 - Stock: 20
```

---

### Find a product

```powershell
node product-cli.js find 2
```

Example:

```text
Product found:
ID: 2
Name: Mobile
Price: ₹25000
Stock: 10
```

---

### Add a product

```powershell
node product-cli.js add Keyboard 1500 20
```

Example:

```text
Product added successfully.
{ id: 4, name: 'Keyboard', price: 1500, stock: 20 }
```

---

# 9. `process.argv`

CLI arguments are received using:

```js
process.argv
```

For:

```powershell
node product-cli.js find 2
```

the important values are:

```text
process.argv[0] → Node.js executable
process.argv[1] → product-cli.js
process.argv[2] → find
process.argv[3] → 2
```

This allows the program to understand commands entered in the terminal.

---

# 10. CLI Validation

The CLI validates user input before modifying the product file.

Examples:

### Invalid ID

```powershell
node product-cli.js find abc
```

Output:

```text
Product ID must be a number.
```

### Missing product name

```powershell
node product-cli.js add
```

Output:

```text
Product name is required.
```

### Invalid price

```powershell
node product-cli.js add Mouse abc 10
```

Output:

```text
Price must be a valid positive number.
```

### Negative price

```powershell
node product-cli.js add Mouse -500 10
```

Output:

```text
Price must be a valid positive number.
```

### Negative stock

```powershell
node product-cli.js add Mouse 500 -10
```

Output:

```text
Stock must be a non-negative integer.
```

### Unknown command

```powershell
node product-cli.js hello
```

Output:

```text
Unknown command.

Available commands:
node product-cli.js list
node product-cli.js find <id>
node product-cli.js add <name> <price> <stock>
```

---

# 11. HTTP Product API

A basic HTTP server was created using Node.js `http`.

Server:

```text
http://localhost:3000
```

---

## API Endpoints

### Home

```text
GET /
```

Response:

```json
{
  "message": "Product API is running"
}
```

Status:

```text
200 OK
```

---

### Get all products

```text
GET /products
```

Returns all products from `products.json`.

Status:

```text
200 OK
```

---

### Get one product

```text
GET /products/2
```

Returns product with ID `2`.

Status:

```text
200 OK
```

---

### Product not found

```text
GET /products/99
```

Response:

```json
{
  "error": "Product not found"
}
```

Status:

```text
404 Not Found
```

---

### Invalid product ID

```text
GET /products/abc
```

Response:

```json
{
  "error": "Product ID must be a number"
}
```

Status:

```text
400 Bad Request
```

---

### Unknown route

Any unsupported route returns:

```json
{
  "error": "Route not found"
}
```

Status:

```text
404 Not Found
```

---

### Slow request

```text
GET /slow
```

This endpoint waits approximately 5 seconds before responding.

It was created to demonstrate graceful shutdown and request draining.

---

# 12. HTTP Status Codes Used

| Status | Meaning                  | Example                 |
| ------ | ------------------------ | ----------------------- |
| 200    | Success                  | Product returned        |
| 400    | Invalid client input     | Invalid product ID      |
| 404    | Resource/route not found | Product does not exist  |
| 500    | Internal server error    | Unexpected server error |
| 503    | Service unavailable      | Server shutting down    |

---

# 13. Graceful Shutdown Flow

The final server shutdown flow is:

```text
SIGINT / SIGTERM
       ↓
shuttingDown = true
       ↓
Stop new traffic
       ↓
server.close()
       ↓
Existing requests get time to finish
       ↓
10 second maximum drain period
       ↓
If necessary:
server.closeAllConnections()
       ↓
Server closed
       ↓
Shutdown complete
```

During shutdown, new requests receive:

```text
503 Service Unavailable
```

with:

```json
{
  "error": "Server is shutting down"
}
```

---

# 14. CPU-Heavy Work and Node.js Event Loop

Node.js uses an event loop to handle asynchronous operations.

JavaScript execution runs mainly on a single event-loop thread.

If CPU-heavy synchronous work runs for a long time:

```js
for (let i = 0; i < 10000000000; i++) {
    // heavy work
}
```

the event loop becomes busy.

Other requests have to wait.

```text
Request 1
   ↓
CPU-heavy work
   ↓
Event Loop blocked
   ↓
Request 2 waits
Request 3 waits
```

For CPU-intensive workloads, approaches such as Worker Threads may be considered.

---

# 15. Synchronous vs Asynchronous I/O

### Synchronous I/O

Example:

```js
fs.readFileSync("products.json");
```

The application waits until the operation finishes.

This can block request processing.

### Asynchronous I/O

Example:

```js
await readFile("products.json", "utf-8");
```

The operation is asynchronous and is better suited for handling multiple requests.

Therefore:

```text
readFileSync() → blocking
readFile()     → asynchronous
```

---

# 16. Verification

The following functionality was tested:

* Stack trace investigation
* Debugger breakpoint
* Incorrect total calculation
* Corrected total calculation
* Invalid input handling
* Negative value validation
* SIGINT shutdown
* SIGTERM shutdown handling
* Slow request
* Bounded drain period
* Product JSON storage
* CLI product listing
* CLI product lookup
* CLI product creation
* CLI validation
* HTTP root endpoint
* HTTP product listing
* HTTP single product lookup
* Product-not-found response
* Invalid product ID response
* Unknown route response
* Graceful server shutdown

---

# Conclusion

T20 demonstrated how to debug Node.js applications and safely shut down a server.

The task covered the complete flow:

```text
Debugging
   ↓
Error Handling
   ↓
File Storage
   ↓
Product CLI
   ↓
HTTP API
   ↓
Graceful Shutdown
```

The main learning from T20 is that production-style Node.js applications should not simply crash or terminate immediately. Errors should be understood, recoverable input errors should be handled, and server shutdown should allow existing work to finish within a controlled time.

T20 also demonstrated that CPU-heavy JavaScript and synchronous I/O can block the Node.js event loop and affect other requests.

## T20 Status

```text
✅ Debugger
✅ Stack Trace
✅ Error Handling
✅ SIGINT / SIGTERM
✅ Graceful Shutdown
✅ Bounded Drain
✅ Product CLI
✅ File Storage
✅ HTTP API
✅ Validation
✅ Event Loop Theory
✅ Verification
```

**T20 Completed Successfully.**
