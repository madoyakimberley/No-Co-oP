import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: "gateway01.eu-central-1.prod.aws.tidbcloud.com",
    port: 4000,
    user: "G3FZLWjDBYoPm2X.root",
    password: process.env.DB_PASSWORD!,
    database: "nocoop",
    ssl: { rejectUnauthorized: true },
  },
});
