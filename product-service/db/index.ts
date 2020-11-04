import { Client } from "pg";
import config from "../config";

const client = new Client({
  host: config.db.host,
  port: +config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

export default client;
