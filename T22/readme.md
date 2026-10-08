# T22 – Middleware, Request ID, Logging & Validation

## Objective

The goal of T22 was to understand Express middleware, request IDs, request logging, JSON body limits, input validation, authorization, and error handling.

The main focus was to make sure that invalid input is rejected before it can modify the product repository.

---

## Topics Covered

* Express middleware
* Middleware execution order
* `req`, `res`, and `next()`
* Request ID generation
* Request logging
* Request duration using `Date.now()`
* JSON body parsing
* JSON body size limit
* Product input validation
* Unknown field validation
* Price and stock validation
* Authorization middleware
* Authentication vs Authorization
* HTTP status codes
* Malformed JSON handling
* Content-Type validation
* Preventing invalid data from modifying the repository

---

## Middleware

Middleware is a function that runs between the incoming request and the final route handler.

Basic structure:

```js
app.use((req, res, next) => {
    // middleware work

    next();
});
```

### `req`

Contains information about the incoming request.

Examples:

```js
req.method
req.originalUrl
req.body
req.params
req.headers
```

### `res`

Used to send a response to the client.

Example:

```js
res.json({
    message: "Success"
});
```

### `next()`

Passes the request to the next middleware or route.

Middleware execution depends on its order.

---

## Request ID

Each request gets a unique request ID using Node.js `crypto`.

```js
import crypto from "node:crypto";

const requestId = crypto.randomUUID();
```

The ID is attached to the request:

```js
req.requestId = requestId;
```

It is also returned in the response header:

```js
res.setHeader("X-Request-ID", requestId);
```

This makes it easier to identify and trace a particular request.

---

## Request Logging

The request logger records:

* Request ID
* HTTP method
* URL
* Response status
* Request duration

Example:

```text
[request-id] POST /product 201 5ms
```

`Date.now()` is used to calculate how long the request took.

```js
const startTime = Date.now();

res.on("finish", () => {
    const duration = Date.now() - startTime;

    console.log(
        `[${requestId}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
});
```

`Date.now()` is not being used to display the current date/time. It is being used to calculate request duration.

---

## JSON Body Limit

Express JSON parsing is configured with a 10 KB limit:

```js
app.use(express.json({ limit: "10kb" }));
```

This prevents unnecessarily large JSON request bodies.

If the request body is too large, the server can return:

```text
413 Payload Too Large
```

---

## Product Validation

Product data is validated before it is added or updated.

Allowed fields:

```text
name
price
stock
```

Unknown fields are rejected.

Example invalid input:

```json
{
    "name": "Pen",
    "price": 50,
    "stock": 10,
    "password": "123"
}
```

The `password` field is not supported, so the request is rejected.

---

## Name Validation

The name must be a string and contain at least 2 characters.

Example:

```json
{
    "name": "P",
    "price": 50,
    "stock": 10
}
```

Response:

```text
400 Bad Request
```

---

## Price Validation

Price must be a number and cannot be negative.

Valid:

```json
{
    "name": "Pen",
    "price": 50,
    "stock": 10
}
```

Invalid:

```json
{
    "name": "Pen",
    "price": -50,
    "stock": 10
}
```

Response:

```text
400 Bad Request
```

---

## Stock Validation

Stock must be an integer and cannot be negative.

Invalid:

```json
{
    "name": "Pen",
    "price": 50,
    "stock": -10
}
```

Also invalid:

```json
{
    "name": "Pen",
    "price": 50,
    "stock": 2.5
}
```

---

## Validation vs Authorization

### Validation

Validation asks:

> Is the input data correct?

Example:

```text
price >= 0
stock >= 0
name is a string
```

### Authorization

Authorization asks:

> Is this user allowed to perform this action?

For example, only an admin should be allowed to update a product.

A simple authorization middleware was created:

```js
function requireAdmin(req, res, next) {
    const role = req.header("x-role");

    if (role !== "admin") {
        return res.status(403).json({
            error: "Admin access required",
            requestId: req.requestId
        });
    }

    next();
}
```

The PUT route can use:

```js
app.put(
    "/product/:id",
    requireAdmin,
    validateProduct,
    (req, res) => {
        // update product
    }
);
```

---

## Authentication vs Authorization

### Authentication

Authentication answers:

> Who are you?

Example:

```text
User logs in with email and password.
```

### Authorization

Authorization answers:

> What are you allowed to do?

Example:

```text
Admin → Can update products
User  → Cannot update products
```

---

## HTTP Status Codes Used

| Status | Meaning                      |
| ------ | ---------------------------- |
| `201`  | Product created successfully |
| `400`  | Bad Request / invalid input  |
| `403`  | Forbidden / not authorized   |
| `404`  | Product not found            |
| `413`  | Request body too large       |
| `415`  | Unsupported Content-Type     |

---

## Malformed JSON

Malformed JSON means the request body is not valid JSON.

Example:

```json
{
    "name": "Pen",
    "price": 50,
}
```

The trailing comma makes the JSON invalid.

The server handles this error and returns a clear error response.

Example:

```json
{
    "error": "Malformed JSON"
}
```

---

## API Endpoints

### Create Product

```text
POST /product
```

Example body:

```json
{
    "name": "Pen",
    "price": 50,
    "stock": 10
}
```

Expected status:

```text
201 Created
```

---

### Update Product

```text
PUT /product/:id
```

Example:

```text
PUT /product/1
```

Example body:

```json
{
    "name": "Blue Pen",
    "price": 60,
    "stock": 20
}
```

---

### Get All Products

```text
GET /products
```

---

### Home

```text
GET /
```

Response confirms that the T22 API is running.

---

## Verification

### Valid Product

Input:

```json
{
    "name": "Pen",
    "price": 50,
    "stock": 10
}
```

Result:

```text
201 Created
```

Product was added successfully.

---

### Invalid Price

Input:

```json
{
    "name": "Wrong Product",
    "price": -500,
    "stock": 20
}
```

Result:

```text
400 Bad Request
```

Product was not changed.

---

### Invalid Stock

Input:

```json
{
    "name": "Pen",
    "price": 50,
    "stock": -10
}
```

Result:

```text
400 Bad Request
```

Product was not changed.

---

### Unsupported Field

Input:

```json
{
    "name": "Pen",
    "price": 50,
    "stock": 10,
    "unknown": "test"
}
```

Result:

```text
400 Bad Request
```

The unsupported field was rejected.

---

### Authorization Test

Header:

```text
x-role: user
```

Result:

```text
403 Forbidden
```

Header:

```text
x-role: admin
```

The request is allowed to continue.

---

## Important Learning

One of the main lessons of T22 is:

> Parsed JSON is not automatically valid business data.

`express.json()` only parses JSON.

It does not automatically check:

* correct fields
* correct types
* valid price
* valid stock
* permissions
* business rules

Therefore, validation must happen before modifying the repository.

---

## Final T22 Flow

```text
Client Request
      ↓
Request ID Middleware
      ↓
JSON Body Parser
      ↓
Authorization
      ↓
Validation
      ↓
Route Handler
      ↓
Repository Mutation
      ↓
Response
      ↓
Logging
```

Invalid input stops before repository mutation.

This ensures that rejected requests do not corrupt or modify product data.
