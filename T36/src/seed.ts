
import { connectToDatabase, closeDatabase } from "./config.ts";

async function seedDatabase() {
  const db = await connectToDatabase();

  const orders = db.collection("orders");

 
  await orders.deleteMany({});

  await orders.insertMany([
    {
      orderId: "O101",
      customerId: "C1",
      status: "delivered",
      total: 300,
      refundAmount: 0,
      createdAt: new Date("2026-10-05T10:00:00Z"),
      items: [
        { productId: "P1", name: "Keyboard", quantity: 2, price: 100 },
        { productId: "P2", name: "Mouse", quantity: 1, price: 100 }
      ]
    },
    {
      orderId: "O102",
      customerId: "C1",
      status: "delivered",
      total: 200,
      refundAmount: 50,
      createdAt: new Date("2026-10-12T10:00:00Z"),
      items: [
        { productId: "P1", name: "Keyboard", quantity: 1, price: 200 }
      ]
    },
    {
      orderId: "O103",
      customerId: "C2",
      status: "delivered",
      total: 400,
      refundAmount: 0,
      createdAt: new Date("2026-10-15T10:00:00Z"),
      items: [
        { productId: "P2", name: "Mouse", quantity: 2, price: 200 }
      ]
    },
    {
      orderId: "O104",
      customerId: "C2",
      status: "cancelled",
      total: 900,
      refundAmount: 0,
      createdAt: new Date("2026-10-18T10:00:00Z"),
      items: [
        { productId: "P1", name: "Keyboard", quantity: 9, price: 100 }
      ]
    },
    {
      orderId: "O105",
      customerId: "C1",
      status: "delivered",
      total: 500,
      refundAmount: 500,
      createdAt: new Date("2026-11-02T10:00:00Z"),
      items: [
        { productId: "P3", name: "Monitor", quantity: 1, price: 500 }
      ]
    }
  ]);

  console.log("T36 seed data inserted successfully");
  console.log("Total test orders:", await orders.countDocuments());

  await closeDatabase();
}

seedDatabase().catch((error: unknown) => {
  console.error("Failed to seed database:", error);
  process.exitCode = 1;
});
