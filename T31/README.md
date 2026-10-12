# T31 — MongoDB CRUD API

## Overview

A REST API built using Node.js, TypeScript, Express.js, and MongoDB.

This project demonstrates database connection, repository pattern, controllers, routes, input validation, and CRUD operations.

## Technologies

- Node.js
- TypeScript
- Express.js
- MongoDB Node.js Driver
- dotenv

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017
   MONGODB_DB=backend_learning
   PORT=5000
   ```

3. Ensure MongoDB is running locally.

## Run the Project

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Type checking:

```bash
npm run typecheck
```

Start the compiled application:

```bash
npm start
```

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API health check |
| GET | `/products` | Get all products |
| POST | `/products` | Create a product |
| GET | `/products/:id` | Get a product by MongoDB ID |
| PATCH | `/products/:id` | Update selected product fields |
| DELETE | `/products/:id` | Delete a product |

## Create Product Example

POST `/products`

```json
{
  "name": "Keyboard",
  "price": 1200,
  "stock": 8
}
```

## Update Product Example

PATCH `/products/:id`

Use the product's MongoDB `_id` in the URL.

```json
{
  "price": 1500
}
```

## Architecture

- `src/config/database.ts` — MongoDB connection and database access.
- `src/repositories/product.repository.ts` — database CRUD operations.
- `src/controllers/product.controller.ts` — request handling and validation.
- `src/routes/product.routes.ts` — API route definitions.
- `src/app.ts` — Express application and middleware.
- `src/server.ts` — database connection and server startup.

## Notes

- MongoDB assigns an `_id` to each product.
- Use the returned `_id` for GET-by-ID, PATCH, and DELETE requests.
- `.env`, `node_modules`, and `dist` should not be committed to Git.
