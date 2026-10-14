# Product API Documentation

## Base URL

`http://localhost:3000`

## 1. Get All Products

* **Method:** GET
* **Endpoint:** `/products`
* **Success status:** `200 OK`
* **Purpose:** Returns all products.

## 2. Get Product by ID

* **Method:** GET
* **Endpoint:** `/products/:id`
* **Success status:** `200 OK`
* **Not found status:** `404 Not Found`
* **Purpose:** Returns one product by ID.

## 3. Create Product

* **Method:** POST
* **Endpoint:** `/products`
* **Success status:** `201 Created`
* **Invalid request status:** `400 Bad Request`
* **Purpose:** Creates a new product.

### Request Body Example

```json
{
  "name": "Mouse",
  "price": 500
}
```

### Validation Rules

* Name must be a non-empty string.
* Price must be a positive, finite number.

## Error Responses

* `400 Bad Request`: Invalid input.
* `404 Not Found`: Product or endpoint not found.
s