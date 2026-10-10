# T28 - TypeScript Interfaces

## Objective
To understand TypeScript interfaces, type aliases, union types, optional properties, nullable properties, type guards, discriminated unions, and exhaustive checking.

## Topics Covered

1. **Interfaces:** Created `Product`, `CartItem`, `Order`, `Customer`, and `Delivery` interfaces.
2. **Union Types:** Used `OrderStatus` to allow only valid order statuses.
3. **Optional Properties:** Used `phoneNumber?` for an optional customer phone number.
4. **Nullable Properties:** Used `string | null` for the delivery date.
5. **Type Guards:** Used `typeof` to distinguish between string and number IDs.
6. **Discriminated Unions:** Created `ValidationResult` for successful and failed quantity validation.
7. **Exhaustive Checking:** Used `assertNever()` to ensure all order statuses are handled.
8. **Quantity Validation:** Checked that quantities are positive integers.
9. **TypeScript Compilation:** Compiled TypeScript using `tsc` and executed the generated JavaScript.

## Files

- `src/models.ts` - Interfaces, types, order examples, and validation functions.
- `tsconfig.json` - TypeScript compiler configuration.
- `package.json` - Project scripts and dependencies.
- `dist/models.js` - Compiled JavaScript output.

## Commands

Build the project:

```bash
npm run build
```

Run the project:

```bash
npm start
```

## Result

The project compiled successfully, and the order details, status descriptions, customer information, and quantity validation results were displayed successfully.

## Conclusion

This task helped me understand how TypeScript interfaces and advanced types make backend code more structured, reusable, and type-safe.