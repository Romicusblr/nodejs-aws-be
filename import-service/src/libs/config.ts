import dotenv from "dotenv";

const env: string = process.env.NODE_ENV ?? "development";

dotenv.config();

export default {
  app: {
    env,
  },
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
  },
};
