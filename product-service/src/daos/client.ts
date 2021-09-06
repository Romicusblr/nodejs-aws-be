import knex, {Knex} from "knex";
import config from "@libs/config";
import {Model} from "@models/db";
import logger from "@libs/logger";
import "./query-logger";

const knexClient = knex({
  client: "pg",
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
  },
  // debug: true
});

logger.info("connected to db: %s@%s:%s/%s", config.db.user, config.db.host, config.db.port, config.db.database);

export class DAO<T extends Model> {
  client: Knex<T, unknown[]>;

  constructor(client?: Knex<T, unknown[]>) {
    this.client = client ?? knexClient;
  }
}

export default knexClient;
