// @generated
// Automatically generated. Don't change this file manually.

import { ProductsDBId } from './ProductsDB';

export type StocksDBId = string & { " __flavor"?: 'stocks' };

export default interface StocksDB {
  /** Primary key. Index: stocks_pkey */
  id: StocksDBId;

  product_id: ProductsDBId | null;

  count: number | null;
}

export interface StocksDBInitializer {
  /**
   * Default value: uuid_generate_v4()
   * Primary key. Index: stocks_pkey
   */
  id?: StocksDBId;

  product_id?: ProductsDBId | null;

  count?: number | null;
}
