# T18 — Core HTTP Server

## Objective

Build a basic HTTP server using Node.js core `http` module without using Express.

This task covers:

* Creating a core HTTP server
* Handling HTTP methods
* Parsing URLs and query parameters
* Reading request body chunks
* Parsing JSON
* Validating request data
* Sending JSON responses
* HTTP status codes
* Request body size limits
* Handling 404 and 405 errors
* Handling malformed JSON
* Properly ending every response

---

## Technologies Used

* Node.js
* JavaScript
* Core `http` module
* JSON
* PowerShell

**Express is not used in this task.**

---

## Project Structure

```text
T18/
├── server.js
└── README.md
```

---

## How to Run

Open PowerShell inside the T18 folder:

```powershell
node server.js
```

Expected output:

```text
Server is running on http://localhost:3000
```

---

# API Endpoints

## 1. GET /health

Checks whether the server is running.

### Request

```text
GET http://localhost:3000/health
```

### PowerShell Test

```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:3000/health
```

### Expected Status

```text
200 OK
```

### Response

```json
{
  "status": "ok"
}
```

---

## 2. GET /products

Returns all products.

### Request

```text
GET http://localhost:3000/products
```

### PowerShell Test

```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:3000/products
```

### Expected Status

```text
200 OK
```

### Example Response

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 50000
  },
  {
    "id": 2,
    "name": "Mobile",
    "price": 25000
  }
]
```

---

## 3. GET /products?name=Laptop

Filters products using a query parameter.

### Request

```text
GET http://localhost:3000/products?name=Laptop
```

### PowerShell Test

```powershell
Invoke-WebRequest -UseBasicParsing "http://localhost:3000/products?name=Laptop"
```

### Expected Status

```text
200 OK
```

The query parameter is read using:

```js
url.searchParams.get("name")
```

---

# 4. POST /products

Creates a new product.

### Request

```text
POST http://localhost:3000/products
```

### PowerShell Test

```powershell
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:3000/products -Method POST -ContentType "application/json" -Body '{"name":"Keyboard","price":2000}'
```

### Expected Status

```text
201 Created
```

### Example Response

```json
{
  "id": 3,
  "name": "Keyboard",
  "price": 2000
}
```

---

# Request Body Handling

POST request data is received in chunks.

```js
let body = "";

req.on("data", (chunk) => {
  body += chunk.toString("utf8");
});

req.on("end", () => {
  // Complete body is available here
});
```

The complete body is parsed using:

```js
JSON.parse(body);
```

---

# Validation

The server validates the product before creating it.

## Product Name

The name:

* Must be a string
* Cannot be empty

## Product Price

The price:

* Must be a number
* Cannot be `NaN`
* Must be greater than `0`

Invalid input returns:

```text
400 Bad Request
```

---

# Malformed JSON

Invalid JSON is handled using `try...catch`.

### Test

```powershell
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:3000/products -Method POST -ContentType "application/json" -Body '{"name":"Mouse","price":'
```

### Expected

```text
400 Bad Request
```

### Response

```json
{
  "error": "Invalid JSON"
}
```

---

# Request Body Size Limit

The server allows a maximum request body size of **10 KB**.

```js
const MAX_BODY_SIZE = 10 * 1024;
```

If the request exceeds this limit, the server returns:

```text
413 Payload Too Large
```

### Test

```powershell
$largeBody = '{"name":"' + ('A' * 11000) + '","price":100}'
```

Then:

```powershell
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:3000/products -Method POST -ContentType "application/json" -Body $largeBody
```

### Expected

```text
413
```

### Response

```json
{
  "error": "Request body too large"
}
```

---

# 404 Not Found

Unknown routes return `404`.

### Test

```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:3000/abc
```

### Expected

```text
404 Not Found
```

### Response

```json
{
  "error": "Route not found"
}
```

---

# 405 Method Not Allowed

Known routes reject unsupported HTTP methods.

For example, `/health` supports only `GET`.

### Test

```powershell
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:3000/health -Method POST
```

### Expected

```text
405 Method Not Allowed
```

### Response

```json
{
  "error": "Method not allowed"
}
```

The response also contains the `Allow` header.

For `/health`:

```text
Allow: GET
```

For `/products`:

```text
Allow: GET, POST
```

---

# JSON Response Header

All JSON responses use:

```text
Content-Type: application/json; charset=utf-8
```

This is configured using:

```js
res.setHeader(
  "Content-Type",
  "application/json; charset=utf-8"
);
```

---

# HTTP Status Codes

| Status Code | Meaning            | Usage                                |
| ----------- | ------------------ | ------------------------------------ |
| 200         | OK                 | Successful GET request               |
| 201         | Created            | Product successfully created         |
| 400         | Bad Request        | Invalid JSON or invalid product data |
| 404         | Not Found          | Unknown route                        |
| 405         | Method Not Allowed | Unsupported HTTP method              |
| 413         | Payload Too Large  | Request body exceeds 10 KB           |

---

# Important Concepts Learned

## 1. Request

The `req` object contains information sent by the client.

Examples:

```js
req.method
req.url
```

---

## 2. Response

The `res` object is used to send a response back to the client.

Examples:

```js
res.statusCode = 200;
res.setHeader(...);
res.end(...);
```

---

## 3. URL Parsing

```js
const url = new URL(
  req.url,
  "http://localhost:3000"
);
```

Useful properties:

```js
url.pathname
url.searchParams
```

---

## 4. Query Parameters

Example:

```text
/products?name=Laptop
```

The value can be accessed using:

```js
url.searchParams.get("name");
```

---

## 5. Request Body Chunks

Request bodies may arrive in multiple chunks.

```js
req.on("data", ...)
```

receives chunks.

```js
req.on("end", ...)
```

runs when the complete request body has been received.

---

## 6. JSON Parsing

```js
JSON.parse(body)
```

converts JSON text into a JavaScript object.

Invalid JSON is handled with:

```js
try {
  // JSON parsing
} catch (error) {
  // Handle invalid JSON
}
```

---

## 7. Response Completion

Every response path must eventually call:

```js
res.end();
```

Otherwise, the client may continue waiting for the response.

---

## 8. Body Size Protection

The server checks the size of incoming request data before processing it.

This prevents unnecessarily large request bodies from being processed.

---

# Testing Summary

| Test                      | Expected Result |
| ------------------------- | --------------: |
| GET /health               |             200 |
| GET /products             |             200 |
| GET /products?name=Laptop |             200 |
| POST valid product        |             201 |
| POST malformed JSON       |             400 |
| POST invalid price        |             400 |
| POST missing name         |             400 |
| Unknown route             |             404 |
| Unsupported method        |             405 |
| Oversized request body    |             413 |

---

# Important Note

Products are stored in an **in-memory JavaScript array**.

Therefore, products added using `POST /products` are lost when the server restarts.

This task focuses on understanding the Node.js core HTTP server and does not use a database.

---

# Conclusion

T18 demonstrates how to build an HTTP API using Node.js core modules without Express.

The task covers:

* HTTP server creation
* Request and response handling
* HTTP methods
* URL parsing
* Query parameters
* Request body chunks
* JSON parsing
* Input validation
* HTTP status codes
* JSON response headers
* Request body size limits
* 404 handling
* 405 handling
* Error handling

This provides the foundation for understanding how frameworks such as Express work internally.
