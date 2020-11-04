import path from "path";

const env: string = (process.env.NODE_ENV = process.env.NODE_ENV || "development");

const dotenvPath: string = path.join(__dirname, `../.env.${env}`);

if (require("dotenv").config({path: dotenvPath}).error) {
  console.log(`${dotenvPath} is not found, app started without env file`);
}

const config = {
  db: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDBNAME,
  },
};

export default config;
