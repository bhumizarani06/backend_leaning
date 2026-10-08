# T23 — Controllers

## Goal

Separate HTTP logic from business logic and data access.

The application follows this flow:

```text
Client
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Data
```

---

## 1. Responsibilities

### Route

Routes decide which controller method should handle a request.

Example:

```text
GET /products
GET /products/:id
POST /products
PUT /products/:id
DELETE /products/:id
POST /products/:id/purchase
```

Routes should not contain business logic.

---

### Controller

The Controller handles HTTP-related work.

Responsibilities:

* Read `req.params`
* Read `req.body`
* Call the Service
* Return HTTP status codes
* Return JSON responses
* Handle HTTP errors

Examples:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
204 No Content
```

The Controller does not calculate business rules.

---

### Service

The Service contains business rules.

Examples:

* Product validation
* Stock validation
* Purchase calculation
* Insufficient stock checking
* Reward calculation

The Service does not use `req` or `res`.

---

### Repository

The Repository handles data access.

Responsibilities:

* Get all products
* Get product by ID
* Create product
* Update product
* Delete product

The Repository does not know about HTTP requests or responses.

---

## 2. Dependency Injection

The Repository is created in `server.js` and passed to the Service.

```js
const productRepository = new ProductRepository();

const productService = new ProductService(
  productRepository
);
```

The Service does not create its own Repository.

The Controller receives the Service:

```js
const productController = new ProductController(
  productService
);
```

This makes the application easier to test and maintain.

---

## 3. Product CRUD

### Get all products

```text
GET /products
```

Returns all products.

### Get one product

```text
GET /products/2
```

Returns the product with ID 2.

If the product does not exist:

```text
404 Not Found
```

### Create product

```text
POST /products
```

Example input:

```json
{
  "id": 4,
  "name": "Notebook",
  "price": 100,
  "stock": 20
}
```

Successful response:

```text
201 Created
```

### Update product

```text
PUT /products/2
```

Example:

```json
{
  "price": 15,
  "stock": 8
}
```

### Delete product

```text
DELETE /products/4
```

Successful response:

```text
204 No Content
```

---

## 4. Purchase and Stock Rule

Purchase endpoint:

```text
POST /products/1/purchase
```

Example:

```json
{
  "quantity": 2
}
```

If the product price is ₹50:

```text
50 × 2 = ₹100
```

If the original stock is 5:

```text
5 - 2 = 3
```

The Service handles this business rule.

If the requested quantity is greater than available stock:

```text
Insufficient stock
```

is returned as an error.

---

## 5. Reward Rule

The Service contains the reward calculation:

```text
Amount ₹100 or more → 1000 reward
Amount ₹250 or more → 2500 reward
Amount ₹500 or more → 3500 reward
```

Examples:

```text
₹100 → 1000
₹250 → 2500
₹500 → 3500
```

---

## 6. Testing Without HTTP

One important goal of T23 was testing business logic without starting the HTTP server.

A fake repository was created:

```text
tests/
├── fake-product.repository.js
└── product.service.test.js
```

The fake repository provides test data to the Service.

```text
Test
  ↓
ProductService
  ↓
FakeProductRepository
```

This means the Service can be tested without Express, routes, or Postman.

---

## 7. Tests

Tests were executed using Node.js built-in test runner:

```powershell
node --test
```

Result:

```text
tests 6
pass 6
fail 0
cancelled 0
skipped 0
todo 0
```

### Tested functionality

* Purchase reduces stock
* Insufficient stock throws an error
* ₹100 reward returns 1000
* ₹250 reward returns 2500
* ₹500 reward returns 3500
* Existing product test also passes

All tests passed successfully.

---

## 8. Full Request Path

Example:

```text
GET /products/2
```

### Step 1 — Route

The route matches:

```text
/products/:id
```

### Step 2 — Controller

Controller reads:

```js
req.params.id
```

and converts it to a number.

### Step 3 — Service

Controller calls:

```js
productService.getProduct(id)
```

### Step 4 — Repository

Service calls:

```js
productRepository.getById(id)
```

### Step 5 — Response

The product is returned to the Controller.

The Controller sends:

```text
200 OK
```

with JSON data.

---

## 9. Main Learning

T23 taught separation of responsibilities.

```text
Route       → Where does the request go?
Controller  → How do we handle HTTP?
Service     → What are the business rules?
Repository  → Where/how is the data accessed?
```

Keeping these responsibilities separate makes the backend easier to understand, test, and maintain.

---

## 10. Files

```text
T23/
├── controllers/
│   └── product.controller.js
├── repositories/
│   └── product.repository.js
├── routes/
│   └── product.routes.js
├── services/
│   └── product.service.js
├── tests/
│   ├── product-test.js
│   └── product.service.test.js
├── server.js
├── package.json
├── package-lock.json
└── readme.md
```

## Verification

Server:

```powershell
npm start
```

Expected:

```text
T23 server running on port 3000
```

Tests:

```powershell
node --test
```

Expected:

```text
tests 6
pass 6
fail 0
```

**T23 — Controllers: Completed**
