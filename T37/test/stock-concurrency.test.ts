
import assert from "node:assert/strict";
import test from "node:test";
import { MongoClient } from "mongodb";

test("only one request reserves the last unit", async () => {
  const client = new MongoClient(
    process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017"
  );

  try {
    await client.connect();

    // Separate test collection; existing products remain untouched.
    const products = client
      .db("backend_learning_t37")
      .collection("stock_concurrency_test");

    await products.deleteMany({ testRun: true });

    try {
      await products.insertOne({
        name: "Test Keyboard",
        stock: 1,
        testRun: true
      });

      const reserveStock = () =>
        products.updateOne(
          {
            name: "Test Keyboard",
            testRun: true,
            stock: { $gte: 1 }
          },
          {
            $inc: { stock: -1 }
          }
        );

      const results = await Promise.all([
        reserveStock(),
        reserveStock()
      ]);

      const successfulReservations = results.filter(
        (result) => result.modifiedCount === 1
      ).length;

      const product = await products.findOne({
        name: "Test Keyboard",
        testRun: true
      });

      assert.equal(successfulReservations, 1);
      assert.equal(product?.stock, 0);

      console.log("Successful reservations:", successfulReservations);
      console.log("Final test stock:", product?.stock);
    } finally {
      await products.deleteMany({ testRun: true });
    }
  } finally {
    await client.close();
  }
});
