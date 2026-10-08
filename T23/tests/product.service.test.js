import test from "node:test";
import assert from "node:assert/strict";

import ProductService from "../services/product.service.js";
import FakeProductRepository from "./product-test.js";


test("purchase should reduce product stock", () => {
  const repository = new FakeProductRepository();

  const service = new ProductService(repository);

  const result = service.purchaseProduct(1, 2);

  assert.equal(result.quantity, 2);
  assert.equal(result.total, 100);
  assert.equal(result.remainingStock, 3);
});


test("purchase should fail when stock is insufficient", () => {
  const repository = new FakeProductRepository();

  const service = new ProductService(repository);

  assert.throws(
    () => service.purchaseProduct(1, 10),
    {
      message: "Insufficient stock"
    }
  );
});


test("reward should return 1000 for amount 100", () => {
  const repository = new FakeProductRepository();

  const service = new ProductService(repository);

  assert.equal(
    service.calculateReward(100),
    1000
  );
});


test("reward should return 2500 for amount 250", () => {
  const repository = new FakeProductRepository();

  const service = new ProductService(repository);

  assert.equal(
    service.calculateReward(250),
    2500
  );
});


test("reward should return 3500 for amount 500", () => {
  const repository = new FakeProductRepository();

  const service = new ProductService(repository);

  assert.equal(
    service.calculateReward(500),
    3500
  );
});