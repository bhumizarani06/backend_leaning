import { app } from "./app";
import { connectDB } from "./db";
import { config } from "./config";

async function startServer() {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

startServer().catch((error) => {
  console.error("Server failed:", error);
  process.exit(1);
});