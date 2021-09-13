import { DAO } from "@daos/client";
import ProductDAO from "@daos/product";
import StockDAO from "@daos/stock";
import {
  StocksDBInitializer,
  ProductsDBInitializer,
  StocksDB,
  ProductsDB,
  Model,
} from "@models/db";

export default class extends DAO<Model> {
  async createProduct(
    params: StocksDBInitializer & ProductsDBInitializer
  ): Promise<StocksDB & ProductsDB> {
    const { count, title, description, price } = params;
    const productWithCount = await this.client.transaction(async (t) => {
      const productDAO = new ProductDAO(t);
      const stockDAO = new StockDAO(t);
      const product = await productDAO.create({ title, description, price });
      await stockDAO.create({ product_id: product.id, count });
      return productDAO.getWithCount(product.id);
    });
    return productWithCount;
  }
}
