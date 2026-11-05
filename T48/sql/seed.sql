INSERT INTO products (name, price, stock, owner_id, metadata)
VALUES
(
    'Laptop',
    55000,
    10,
    101,
    '{
        "color": "Black",
        "ram": "16GB",
        "processor": "Intel i7",
        "packaging": {
            "type": "Box",
            "recyclable": true
        }
    }'::jsonb
),
(
    'Mouse',
    800,
    25,
    101,
    '{
        "color": "White",
        "connection": "Wireless",
        "packaging": {
            "type": "Cardboard",
            "recyclable": true
        }
    }'::jsonb
),
(
    'Keyboard',
    1500,
    15,
    102,
    '{
        "color": "Black",
        "connection": "USB",
        "packaging": {
            "type": "Box",
            "recyclable": false
        }
    }'::jsonb
);