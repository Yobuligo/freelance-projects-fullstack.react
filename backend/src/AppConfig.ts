import * as dotenv from "dotenv";
import * as path from "path";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const AppConfig = {
  reloadIntervalMins: 20,
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT!),
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  PEPPER: "c894eed9031e71867d76ca1784fadb0a87ca7cd4b83e2c5603a818d2616576f8",
};
