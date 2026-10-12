# T32 — Schema Design

## Goal
Design user, product, and order schemas using references, embedded documents, and validation.

## Project Structure
```text
T32/
├── data/
│   ├── users.json
│   ├── products.json
│   └── orders.json
├── validate.js
├── queries.md
├── package.json
└── README.md
```

## Schema Design

- **Users:** `_id`, `name`, `email`
- **Products:** `_id`, `name`, `price`, `stock`
- **Orders:** `_id`, `customerId`, `items`, `total`, `status`

### Design Decisions
- `customerId` references a user.
- Order `items` are embedded inside the order.
- `productId` references a product.
- `productName` and `priceAtPurchase` preserve purchase-time information.
- Orders are stored separately to avoid unbounded growth in user documents.

## Validation
`validate.js` checks:
- Required fields
- Non-negative product price and stock
- Existing customer and product references
- Positive item quantity
- Non-negative purchase price
- Correct order total

## Run
```powershell
npm run validate
```

Expected output:
```text
All schema validation checks passed!
```

## Verification
Tested valid data and an incorrect order total. Validation passed for correct data and reported an error for an incorrect total.

## Learning Outcomes
Learned access patterns, document boundaries, embedding vs references, required fields, validation, and purchase-time snapshots.