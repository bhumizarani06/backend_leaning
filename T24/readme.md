# T24 - Centralized Error Handling

## Objective

The goal of this task is to implement centralized error handling in an Express.js application and return consistent, secure error responses.

## Concepts Covered

* Custom `AppError` class
* Centralized Express error-handling middleware
* HTTP status codes and error codes
* Request ID generation using `crypto.randomUUID()`
* Invalid JSON request handling
* Unexpected server error handling
* Async error handling in Express 5
* Safe public error messages and private server-side logs

## Project Structure

```text
T24/
├── server.js
├── error/
│   └── AppError.js
├── middleware/
│   ├── errorHandler.js
│   └── requestId.js
└── readme.md
```

## How It Works

1. `requestId.js` generates a unique ID for each request.
2. `express.json()` parses incoming JSON request bodies.
3. Routes handle requests and throw errors when necessary.
4. `AppError.js` defines custom operational errors.
5. `errorHandler.js` formats errors into a consistent JSON response.
6. The error middleware is registered after the routes.

## Test Cases

### 1. Home Route

**Request:** `GET /`

**Expected:** `200 OK` with an API message and request ID.

### 2. Product Not Found

**Request:** `GET /products/99`

**Expected:** `404 Not Found`

```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product not found"
  },
  "requestId": "unique-request-id"
}
```

### 3. Invalid JSON

**Request:** `POST /products` with malformed JSON.

**Expected:** `400 Bad Request` with error code `INVALID_JSON`.

### 4. Unexpected Server Error

**Request:** `GET /test/server-error`

**Expected:** `500 Internal Server Error` with a generic public message.

### 5. Async Error

**Request:** `GET /test/async-error`

**Expected:** `500 Internal Server Error`. Express 5 automatically forwards rejected promises from async route handlers to the error middleware.

### 6. Product Creation

**Request:** `POST /products`

**Expected:** `201 Created` when valid product data is provided.

## Security Practices

* Do not expose stack traces or internal error details in API responses.
* Log diagnostic information on the server.
* Include a request ID to help trace errors.
* Use appropriate HTTP status codes.
* Return consistent JSON error responses.

## Run the Project

```bash
npm start
```

The server runs at `http://localhost:5000`.

## Note

This task uses sample routes and in-memory data. Product creation is simulated and does not persist products to a database.
