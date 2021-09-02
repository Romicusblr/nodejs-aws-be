// Update with your config settings.
import dotenv from "dotenv";

const env: string = (process.env.NODE_ENV = process.env.NODE_ENV || "development");
console.log("Using environment: ", env);


dotenv.config();

const config = {
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
  },
  migrations: {
    tableName: "knex_migrations",
    schemaName: "rs",
    extension: "ts"
  },
};

module.exports = {
  development: config,
  staging: config,
  production: config,
};
