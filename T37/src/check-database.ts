
import { client } from "./config.ts";

async function checkDatabase(): Promise<void> {
  try {
    await client.connect();

    console.log("MongoDB connected successfully!");

    const result = await client.db("admin").command({
      hello: 1
    });

    if (result.setName) {
      console.log("Deployment type: Replica set");
      console.log("Replica set name:", result.setName);
    } else if (result.msg === "isdbgrid") {
      console.log("Deployment type: Sharded cluster");
    } else {
      console.log("Deployment type: Standalone");
      console.log("Transactions across multiple documents need a replica set or sharded cluster.");
    }
  } catch (error) {
    console.error("Database check failed:", error);
  } finally {
    await client.close();
  }
}

checkDatabase();
