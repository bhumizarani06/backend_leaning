# T46 - PostgreSQL Schemas

## Objective

Port a MySQL order schema to PostgreSQL and understand
PostgreSQL data types, constraints, identifiers and schemas.

## Database

Database used: t46_orders

Verification database: t46_orders_verify

## Tables

1. products
2. orders
3. order_items

## Migration Verification

Command:

psql -U postgres -d t46_orders_verify -f migrations/create_orders.sql

Result:
- products table created
- orders table created
- order_items table created

## Seed Verification

Expected records:
- products: 6
- orders: 4
- order_items: 1

## MySQL vs PostgreSQL Differences

| MySQL | PostgreSQL | Purpose |
|---|---|---|
| AUTO_INCREMENT | GENERATED ALWAYS AS IDENTITY | Automatically generated IDs |
| DECIMAL(10,2) | NUMERIC(10,2) | Exact decimal values |
| INT | INTEGER | Whole numbers |
| DATETIME | TIMESTAMP | Date and time without timezone |
| VARCHAR(255) | VARCHAR(255) | Variable-length text |
| InnoDB foreign keys | PostgreSQL FOREIGN KEY | Referential integrity |

## Constraints

- PRIMARY KEY uniquely identifies each record.
- NOT NULL prevents empty values.
- CHECK validates values.
- FOREIGN KEY connects related tables.

## Important Timezone Note

The current order_date column uses TIMESTAMP WITHOUT TIME ZONE.

It stores date and time without timezone information.
UTC instant storage has not been verified using TIMESTAMPTZ.