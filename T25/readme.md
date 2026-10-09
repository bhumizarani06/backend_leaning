# T25 - Advanced Product Listing API

## Overview

In this task, I built an Express.js Product Listing API with pagination, filtering, sorting, and input validation.

I also implemented both Offset Pagination and Keyset Pagination to understand different ways of retrieving products in small batches.

## Technologies Used

* Node.js
* Express.js
* JavaScript
* REST API
* JSON

## Features

### 1. Product Listing

* Returns a list of products.
* Provides product details such as ID, name, category, price, and stock.

### 2. Offset Pagination

Offset pagination uses a page number and limit to retrieve products.

Example:

`GET /products?page=2&limit=3`

Concepts used:

* Page number
* Limit
* Offset calculation
* Array `slice()`
* Total items and total pages

### 3. Keyset Pagination

Keyset pagination retrieves products using the ID of the last item received.

Example:

`GET /products/keyset?limit=2`

To retrieve the next batch:

`GET /products/keyset?limit=2&afterId=2`

The response includes:

* `limit`: Number of products requested.
* `nextCursor`: ID to use for the next request.
* `hasMore`: Indicates whether more products are available.

### 4. Filtering

Products can be filtered using query parameters.

Examples:

* `GET /products?category=Accessories`
* `GET /products?available=true`
* `GET /products?available=false`
* `GET /products?minPrice=10000`
* `GET /products?maxPrice=5000`
* `GET /products?minPrice=1000&maxPrice=3000`

Multiple filters can be combined in one request.

### 5. Sorting

Products can be sorted by ID, name, or price.

Examples:

* `GET /products?sortBy=price&order=asc`
* `GET /products?sortBy=price&order=desc`
* `GET /products?sortBy=name&order=asc`
* `GET /products?sortBy=id&order=desc`

Sorting supports ascending (`asc`) and descending (`desc`) order.

### 6. Input Validation

The API validates query parameters, including:

* Positive page numbers and limits
* Maximum limit of 50 products
* Allowed sorting fields and orders
* Supported product categories
* Availability values
* Minimum and maximum prices
* Valid Keyset cursor values

Invalid input returns an appropriate HTTP 400 response.

## API Endpoints

| Method | Endpoint                             | Purpose                                          |
| ------ | ------------------------------------ | ------------------------------------------------ |
| GET    | `/products`                          | List products with pagination                    |
| GET    | `/products?category=Accessories`     | Filter by category                               |
| GET    | `/products?sortBy=price&order=asc`   | Sort by price                                    |
| GET    | `/products/keyset?limit=2`           | Retrieve the first batch using Keyset Pagination |
| GET    | `/products/keyset?limit=2&afterId=2` | Retrieve products after ID 2                     |

## How to Run

1. Open the T25 project folder in VS Code.

2. Install dependencies if needed:

   `npm install`

3. Start the server:

   `npm start`

4. Open the API in a browser:

   `http://localhost:3000/products`

## Key Concepts Learned

* Express.js GET routes
* Request query parameters using `req.query`
* Input validation and HTTP status codes
* Filtering with `Array.filter()`
* Sorting with `Array.sort()`
* String comparison using `localeCompare()`
* Pagination using `slice()`
* Offset and Keyset Pagination
* Cursor-based navigation
* Returning structured JSON responses

## Conclusion

This task helped me understand how to build a product listing API with pagination, filtering, sorting, and validation. I learned how Offset Pagination and Keyset Pagination work and how query parameters control the API response.
