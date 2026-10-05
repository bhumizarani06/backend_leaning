# T06 — Functions

## Goal

Extract bill and reward logic into reusable functions.

## Functions Implemented

### 1. calculateLineTotal()

Calculates the total price of one cart item.

Formula:

price × quantity

Default quantity is 1 if quantity is not provided.

Example:

Input:
price = 5000
quantity = 2

Output:
10000

### 2. calculateCartTotal()

Calculates the total amount of all items in the cart.

Example:

Input:
[
  { price: 5000, quantity: 2 },
  { price: 7000, quantity: 3 }
]

Output:
31000

Calculation:

5000 × 2 = 10000
7000 × 3 = 21000
Total = 31000

### 3. calculateMonthlyReward()

Calculates monthly reward based on spending in cents.

Reward rules:

25000 cents → 10
50000 cents → 25
100000 cents → 35

The highest applicable threshold is selected.

## Input Validation

calculateLineTotal validates that:

- price must be a number
- quantity must be a number
- price cannot be negative
- quantity cannot be negative

Invalid inputs throw an Error.

## Boundary Testing

| Spending | Expected Reward |
|----------|-----------------|
| 24999 | 0 |
| 25000 | 10 |
| 49999 | 10 |
| 50000 | 25 |
| 99999 | 25 |
| 100000 | 35 |
| 100001 | 35 |

## Verification Output

```text
10000
5000
0
31000
0
10
10
25
25
35
35