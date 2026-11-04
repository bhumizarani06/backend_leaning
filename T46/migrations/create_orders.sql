
CREATE TABLE products
 (
   product_id  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    product_name VARCHAR(255) NOT NULL,
    
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),

    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0)
  );


  CREATE TABLE orders
   (
       order_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

       customer_name VARCHAR(255) NOT NULL,

         order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

         total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0)

  );



  CREATE TABLE order_items
  (
      order_item_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

      order_id INTEGER NOT NULL,

      product_id INTEGER NOT NULL,

      quantity INTEGER NOT NULL CHECK (quantity > 0),

      unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),

      CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
        CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id)
      
  );