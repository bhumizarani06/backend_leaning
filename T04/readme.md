# T04 - Bill Calculator

## Goal

Build a simple bill calculator using JavaScript variables, data types, operators, type conversion, and input validation.

## Concepts Covered

- console.log()
- const
- let
- var scope
- JavaScript primitive data types
- typeof
- Objects
- Arithmetic operators
- Comparison operators
- Logical operators
- === vs ==
- Number()
- Number.isFinite()
- trim()
- Input validation
- Template literals

## Bill Calculation

The bill is calculated using:

priceCents * quantity

Example:

priceCents = 50000
quantity = 3

Total = 150000 cents

## Input Validation

The quantity is checked before calculating the bill.

- Empty input is rejected.
- Invalid text such as "abc" is rejected.
- Zero is rejected.
- Negative quantity is rejected.
- Valid positive numbers are accepted.

## String vs Number

"2" + 3 produces:

23

because "2" is a string.

Number("2") + 3 produces:

5

because "2" is converted into a number.

## Important Functions

### trim()

Used to remove leading and trailing spaces from a string.

### Number()

Converts numeric text into a JavaScript number.

### Number.isFinite()

Checks whether the value is a valid finite number.

## Verification

Tested inputs:

| Input | Result |
|---|---|
| "3" | Valid quantity |
| "" | Quantity is required |
| "abc" | Invalid quantity |
| "0" | Rejected |
| "-2" | Rejected |



## T05 — Conditions

### Reward Tiers

Monthly customer spending is calculated in cents.

|          Spending | Reward |
| ----------------: | -----: |
| Below 25000 cents |     $0 |
| 25000–49999 cents |    $10 |
| 50000–99999 cents |    $25 |
|     100000+ cents |    $35 |

### Implementation

The reward calculation checks the highest threshold first:

```js
function calculateReward(spendingCents) {
    if (spendingCents >= 100000) {
        return 35;
    } else if (spendingCents >= 50000) {
        return 25;
    } else if (spendingCents >= 25000) {
        return 10;
    } else {
        return 0;
    }
}
```

### Reproducible Test Input

```text
20000
25000
50000
100000
```

### Expected Output

```text
0
10
25
35
```

### Sample Customer Spending

```text
15000
25000
32000
50000
75000
100000
150000
```

### Sample Output

```text
Spending: 15000 cents → Reward: $0
Spending: 25000 cents → Reward: $10
Spending: 32000 cents → Reward: $10
Spending: 50000 cents → Reward: $25
Spending: 75000 cents → Reward: $25
Spending: 100000 cents → Reward: $35
Spending: 150000 cents → Reward: $35
```

### Verification

* The highest applicable reward tier is selected.
* Spending below 25000 cents receives no reward.
* 25000 cents receives $10.
* 50000 cents receives $25.
* 100000 cents receives $35.
* Spending above 100000 cents still receives only $35.
* The reward never exceeds $35.
* Higher thresholds are checked before lower thresholds.
