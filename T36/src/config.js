import "dotenv/config";
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
if (!uri || !dbName) {
    throw new Error("MONGODB_URI and MONGODB_DB must be configured");
}
const client = new MongoClient(uri);
export async function connectToDatabase() {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
}
export async function closeDatabase() {
    await client.close();
    console.log("MongoDB connection closed");
}
//# sourceMappingURL=config.js.map