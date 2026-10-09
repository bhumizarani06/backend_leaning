
import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "./app.js";
import { resetProducts } from "./product.js";

beforeEach(() => {
    resetProducts();
});

test("GET /products returns all products", async () => {
    const response = await request(app).get("/products");

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.length, 2);
    assert.equal(response.body.data[0].name, "laptop");
    assert.equal(response.body.data[1].name, "mobile");
});

test("POST /products creates a product", async () => {
    const response = await request(app)
        .post("/products")
        .send({ name: "Mouse", price: 500 });

    assert.equal(response.status, 201);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.name, "Mouse");
    assert.equal(response.body.data.price, 500);
    assert.equal(typeof response.body.data.id, "number");
});

test("GET /products/:id returns one product", async () => {
    const response = await request(app).get("/products/2");

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.id, 2);
    assert.equal(response.body.data.name, "mobile");
    assert.equal(response.body.data.price, 25000);
});


test("POST /products rejects invalid price", async () => {
    const response = await request(app)
        .post("/products")
        .send({
            name: "Keyboard",
            price: -100
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
});

test("Invalid product request does not change products", async () => {
    const beforeResponse = await request(app).get("/products");

    await request(app)
        .post("/products")
        .send({
            name: "Keyboard",
            price: -100
        });

    const afterResponse = await request(app).get("/products");

    assert.equal(
        afterResponse.body.data.length,
        beforeResponse.body.data.length
    );

    assert.deepEqual(
        afterResponse.body.data,
        beforeResponse.body.data
    );
});

test("Invalid product is not added to the list", async () => {
    const response = await request(app)
        .post("/products")
        .send({
            name: "Keyboard",
            price: -100
        });

    assert.equal(response.status, 400);

    const productsResponse = await request(app).get("/products");

    assert.equal(productsResponse.body.data.length, 2);
});

test("GET /products/:id returns 404 for missing product", async () => {
    const response = await request(app).get("/products/999");

    assert.equal(response.status, 404);
    assert.equal(response.body.success, false);
    assert.equal(response.body.message, "Product not found");
});

test("Unknown route returns 404", async () => {
    const response = await request(app).get("/unknown");

    assert.equal(response.status, 404);
});