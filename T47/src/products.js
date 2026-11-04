const pool = require("./db");

async function getALLProducts()
{
  const result = await pool.query("select * from products order by id");
  return result.rows;
}

async function createProduct(name,sku,category,price)
{
    const result = await pool.query(
    `INSERT INTO products (name, sku, category, price)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, sku, category, price]
    );
    return result.rows[0];
}

async function getProductById(id)
{
    const result = await pool.query("select * from products where id=$1",[id]);
    return result.rows[0];
}

async function updateProduct(id, name, price)
{
    const result = await pool.query(
  `UPDATE products
     SET name = $1, price = $2
     WHERE id = $3
     RETURNING *`,
    [name, price, id]
    );
    return result.rows[0];
}
async function deleteProduct(id)
{
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
}

async function upsertProduct(name,sku,category,price)
{
    const result = await pool.query(
    `INSERT INTO products (name, sku, category, price)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (sku) DO UPDATE
       SET name = EXCLUDED.name, category = EXCLUDED.category, price = EXCLUDED.price
        RETURNING *`,
    [name, sku, category, price]
    );
    return result.rows[0];  
}
module.exports = {getALLProducts, createProduct, getProductById, updateProduct, deleteProduct, upsertProduct    };
