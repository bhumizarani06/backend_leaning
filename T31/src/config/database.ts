import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  throw new Error("MONGODB_URI and MONGODB_DB must be configured");
}

const client = new MongoClient(uri);
let database: Db;

export async function connectDB(): Promise<void> {
await client.connect();
database = client.db(dbName);
console.log("Connected to MongoDB database: " + dbName);
}

export function getDB(): Db {
if (!database) {
throw new Error("Database is not connected");
}
return database;
}
export async function closeDB(): Promise<void> {
await client.close();
}