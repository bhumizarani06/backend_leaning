
import { connectToDatabase, closeDatabase } from "./config.ts";

async function runAggregation() {
  const db = await connectToDatabase();
  const orders = db.collection("orders");

  const monthlyCustomerSpend = await orders.aggregate([
   
    {
      $match: {
        status: "delivered"
      }
    },

    {
      $group: {
        _id: {
          customerId: "$customerId",
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        monthlySpend: {
          $sum: {
            $subtract: ["$total", "$refundAmount"]
          }
        }
      }
    },

    
    {
      $project: {
        _id: 0,
        customerId: "$_id.customerId",
        year: "$_id.year",
        month: "$_id.month",
        monthlySpend: 1
      }
    },

  
    {
      $sort: {
        year: 1,
        month: 1,
        monthlySpend: -1,
        customerId: 1
      }
    }
  ]).toArray();

  console.log("\nMonthly Customer Spending:");
  console.log(JSON.stringify(monthlyCustomerSpend, null, 2));

  const topProducts = await orders.aggregate([
  {
    $match: { status: "delivered" }
  },
  {
    $unwind: "$items"
  },
  {
    $group: {
      _id: {
        productId: "$items.productId",
        name: "$items.name"
      },
      totalQuantity: {
        $sum: "$items.quantity"
      }
    }
  },
  {
    $project: {
      _id: 0,
      productId: "$_id.productId",
      name: "$_id.name",
      totalQuantity: 1
    }
  },
  {
    $sort: {
      totalQuantity: -1,
      productId: 1
    }
  },
  {
    $limit: 3
  }
]).toArray();

console.log("\nTop Selling Products:");
console.log(JSON.stringify(topProducts, null, 2));

  await closeDatabase();
}

runAggregation().catch((error: unknown) => {
  console.error("Aggregation failed:", error);
  process.exitCode = 1;
});
