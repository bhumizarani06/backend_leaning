
import "dotenv/config";
import mongoose from "mongoose";
import { Product } from "../models/Product.js";

async function checkQueryPlan(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(uri);
  await Product.init();

  const collection = mongoose.connection.db?.collection("products");

  if (!collection) {
    throw new Error("Products collection is not available");
  }

  const result = await collection
    .find({
      category: "Electronics",
      price: { $lt: 2000 }
    })
    .explain("executionStats");

  console.log("Query execution statistics:");
  console.log(
    JSON.stringify(
      {
        winningPlan: result.queryPlanner.winningPlan,
        nReturned: result.executionStats.nReturned,
        totalDocsExamined: result.executionStats.totalDocsExamined,
        totalKeysExamined: result.executionStats.totalKeysExamined
      },
      null,
      2
    )
  );

  await mongoose.disconnect();
}

checkQueryPlan().catch(async (error: unknown) => {
  console.error("Query plan failed:", error);
  await mongoose.disconnect();
  process.exitCode = 1;
});
