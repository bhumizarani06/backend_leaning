
import test from "node:test";
import assert from "node:assert/strict";
import app from "../dist/app.js";
import { createServer } from "node:http";

test("GET /products returns product data", async () => {
  const server = createServer(app);

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  try {
    const address = server.address();
    const response = await fetch(
      `http://127.0.0.1:${address.port}/products`
    );

    assert.equal(response.status, 200);

    const body = await response.json();

    assert.equal(body.success, true);
    assert.equal(body.data.length, 2);
    assert.equal(body.data[0].name, "Keyboard");
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
});


test("POST /products creates a product", async () => {
  const server = createServer(app);

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  try {
    const address = server.address();

    const response = await fetch(
      `http://127.0.0.1:${address.port}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Monitor",
          price: 8000,
          stock: 5
        })
      }
    );

    assert.equal(response.status, 201);

    const body = await response.json();

    assert.equal(body.success, true);
    assert.equal(body.data.name, "Monitor");
    assert.equal(body.data.price, 8000);
    assert.equal(body.data.stock, 5);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
});
