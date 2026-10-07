# T21 - Express REST API

## Overview

T21 is a beginner-level REST API built using Node.js and Express.js.

The project implements Product CRUD operations using an in-memory array.

## Technologies Used

* Node.js
* Express.js
* JavaScript
* REST API
* Postman

## Project Structure

```text
T21/
├── server.js
├── package.json
├── package-lock.json
└── routes/
    └── product.routes.js
```

## How to Run

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Server runs on:

```text
http://localhost:3000
```

## API Endpoints

### 1. GET All Products

```text
GET /products
```

Returns all products.

**Status:** `200 OK`

---

### 2. GET Single Product

```text
GET /products/:id
```

Example:

```text
GET /products/1
```

**Success:** `200 OK`

If the product does not exist:

```text
404 Not Found
```

Response:

```json
{
    "message": "Product not found"
}
```

---

### 3. GET Products with Query Parameters

Minimum price:

```text
GET /products?minPrice=10000
```

Maximum price:

```text
GET /products?maxPrice=40000
```

Price range:

```text
GET /products?minPrice=10000&maxPrice=40000
```

Search:

```text
GET /products?search=laptop
```

Query parameters are used for filtering and searching products.

Invalid query values return:

```text
400 Bad Request
```

---

### 4. POST Create Product

```text
POST /products
```

Request body:

```json
{
    "name": "Keyboard",
    "price": 1500,
    "stock": 20
}
```

The server generates the product ID automatically.

**Status:** `201 Created`

Invalid product data returns:

```text
400 Bad Request
```

---

### 5. PUT Update Product

```text
PUT /products/:id
```

Example:

```text
PUT /products/1
```

Request body:

```json
{
    "name": "Gaming Laptop",
    "price": 60000,
    "stock": 8
}
```

PUT is used for a complete update of the product.

**Status:** `200 OK`

If the product does not exist:

```text
404 Not Found
```

---

### 6. PATCH Update Product Partially

```text
PATCH /products/:id
```

Example:

```text
PATCH /products/1
```

Request body:

```json
{
    "stock": 10
}
```

PATCH updates only the fields provided in the request.

**Status:** `200 OK`

---

### 7. DELETE Product

```text
DELETE /products/:id
```

Example:

```text
DELETE /products/3
```

If deletion is successful:

```text
204 No Content
```

The response has no body.

If the product does not exist:

```text
404 Not Found
```

## HTTP Status Codes Used

| Status Code | Meaning                                  |
| ----------- | ---------------------------------------- |
| 200         | Request successful                       |
| 201         | Resource created                         |
| 204         | Successful request with no response body |
| 400         | Invalid request data                     |
| 404         | Resource not found                       |

## Path, Query and Body

### Path Parameter

```text
/products/1
```

Used to identify a specific product.

### Query Parameter

```text
/products?minPrice=10000
```

Used for filtering or searching.

### Request Body

```json
{
    "name": "Keyboard",
    "price": 1500,
    "stock": 20
}
```

Used to send data to the server.

## Important Concepts Learned

* Express application setup
* Express Router
* REST API design
* HTTP methods
* CRUD operations
* Path parameters
* Query parameters
* Request body
* JSON middleware
* HTTP status codes
* PUT vs PATCH
* Server-generated IDs
* In-memory repository
* Product validation
* Error handling
* Postman API testing
* Plural resource URLs

## Note

This project uses an in-memory array instead of a database.

Therefore, product changes are lost whenever the server restarts.

This is intentional for learning REST API fundamentals before introducing a database.
