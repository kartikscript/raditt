import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./drizzle/schema/*",
  driver: "pg",
  out: "./drizzle/migrations",
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  },
} satisfies Config;
