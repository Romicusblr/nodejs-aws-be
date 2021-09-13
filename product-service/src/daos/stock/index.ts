import { DAO } from "@daos/client";
import { STOCKS } from "@daos/tables";
import { StocksDB, StocksDBInitializer } from "@models/db";
const table = STOCKS;

export default class extends DAO<StocksDB> {
  async create(params: StocksDBInitializer): Promise<StocksDB> {
    const [res] = await this.client(table)
      .insert(params)
      .returning("*")
      .onConflict()
      .ignore();
    return res;
  }
}
