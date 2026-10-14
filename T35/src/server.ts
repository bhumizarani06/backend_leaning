
import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app.js";

const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

async function startServer(): Promise<void> {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(MONGODB_URI);

  console.log("Connected to MongoDB");

  await mongoose.connection.db?.command({ ping: 1 });

  await app.listen(PORT);

  console.log(`Server running on port ${PORT}`);
}

startServer().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exitCode = 1;
});
