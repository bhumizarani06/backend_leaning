# T41 – Database Normalization

## Tasks Completed
- Created a separate `categories` table.
- Created a `product_categories` junction table.
- Used a composite primary key to prevent duplicate product-category pairs.
- Added product name and price snapshots to the `orders` table.
- Updated the product title and verified that saved order snapshots remained unchanged.

## Tables
- `products` – Stores product details.
- `categories` – Stores unique category names.
- `product_categories` – Maps products to categories.
- `orders` – Stores order details and snapshot fields.

## Denormalization
The `product_name_snapshot` and `product_price_snapshot` columns intentionally store copied product information to preserve order details when current product information changes.

**Note:** Existing snapshots were populated using current product values for demonstration. They are not verified original order-time prices.

## Result
Successfully demonstrated category mapping, duplicate prevention, normalization, and historical snapshot behavior.