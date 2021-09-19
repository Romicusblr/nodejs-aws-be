// @generated
// Automatically generated. Don't change this file manually.

export type ProductsDBId = string & { " __flavor"?: 'products' };

export default interface ProductsDB {
  /** Primary key. Index: products_pkey */
  id: ProductsDBId;

  title: string;

  description: string | null;

  price: number | null;
}

export interface ProductsDBInitializer {
  /**
   * Default value: uuid_generate_v4()
   * Primary key. Index: products_pkey
   */
  id?: ProductsDBId;

  title: string;

  description?: string | null;

  price?: number | null;
}
