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