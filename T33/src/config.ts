import "dotenv/config";

const port = Number(process.env.PORT);
const mongoUri = process.env.MONGODB_URI;

if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  throw new Error("PORT must be a valid port number");
}

if (!mongoUri) {
  throw new Error("MONGODB_URI is required");
}

export const config = {
  port,
  mongoUri
};