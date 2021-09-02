// @generated
// Automatically generated. Don't change this file manually.

import ProductsDB, { ProductsDBInitializer, ProductsDBId } from './ProductsDB';
import StocksDB, { StocksDBInitializer, StocksDBId } from './StocksDB';

type Model =
  | ProductsDB
  | StocksDB

interface ModelTypeMap {
  'products': ProductsDB;
  'stocks': StocksDB;
}

type ModelId =
  | ProductsDBId
  | StocksDBId

interface ModelIdTypeMap {
  'products': ProductsDBId;
  'stocks': StocksDBId;
}

type Initializer =
  | ProductsDBInitializer
  | StocksDBInitializer

interface InitializerTypeMap {
  'products': ProductsDBInitializer;
  'stocks': StocksDBInitializer;
}

export type {
  ProductsDB, ProductsDBInitializer, ProductsDBId,
  StocksDB, StocksDBInitializer, StocksDBId,

  Model,
  ModelTypeMap,
  ModelId,
  ModelIdTypeMap,
  Initializer,
  InitializerTypeMap
};
