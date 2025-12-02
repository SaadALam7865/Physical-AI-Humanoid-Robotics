import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables immediately
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try loading from parent directory .env (if running from src) or current directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.DATABASE_URL) {
  console.warn("⚠️ WARNING: DATABASE_URL is not set in environment variables!");
} else {
  console.log("✅ DATABASE_URL loaded successfully (starting with):", process.env.DATABASE_URL.substring(0, 15) + "...");
}

export const config = {
  databaseUrl: process.env.DATABASE_URL,
  betterAuthSecret: process.env.BETTER_AUTH_SECRET,
  betterAuthUrl: process.env.BETTER_AUTH_URL || "http://localhost:3002",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  port: process.env.PORT || 3002,
  nodeEnv: process.env.NODE_ENV || "development",
};
