import { DAO } from "@daos/client";
import { STOCKS, PRODUCTS } from "@daos/tables";
import { toPaging, Paging } from "@libs/paging";
import { ProductsDB, ProductsDBInitializer, StocksDB } from "@models/db";
const table = PRODUCTS;

export default class extends DAO<ProductsDB> {
  async create(params: ProductsDBInitializer) {
    const [res] = await this.client(table)
      .insert(params)
      .returning("*")
      .onConflict()
      .ignore();
    return res;
  }

  async getWithCount(id: string): Promise<ProductsDB> {
    if (!id) return null;
    const [res] = await this.client(table)
      .select()
      .join(STOCKS, `${PRODUCTS}.id`, `${STOCKS}.product_id`)
      .where({ [`${PRODUCTS}.id`]: id });
    return res;
  }

  async searchWithCount(equal: Partial<ProductsDB>, paging?: Paging) {
    const { limit, offset } = toPaging(paging);

    const [{ count: total }] = await this.client(table)
      .count()
      .join(STOCKS, `${PRODUCTS}.id`, `${STOCKS}.product_id`)
      .where(equal);

    let rows: Array<ProductsDB & StocksDB> = [];

    if (total) {
      rows = await this.client(table)
        .select()
        .join(STOCKS, `${PRODUCTS}.id`, `${STOCKS}.product_id`)
        .where(equal)
        .limit(limit)
        .offset(offset);
    }

    return { total, rows };
  }
}
