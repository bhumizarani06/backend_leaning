create table products(
id serial primary key,
name VARCHAR(100) not null,
price NUMERIC(10,2) not null check (proce >=0),
stock INTEGER not null check (stock >=0),
owner_id INTEGER  not null,
metadata JSONB NOT NULL DEFAULT '{}' :: jsonb,

constraint products_metadata_valid check
(
    jsonb_typeof(metadata) = 'object' and
(
    not(metadata ? 'color') or
    jsonb_typeof(metadata -> 'color') = 'string'
)
)

);