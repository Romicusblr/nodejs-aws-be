CREATE SCHEMA IF NOT EXISTS products;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products.product
(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text not null,
    description text,
    price integer,
)

CREATE TABLE IF NOT EXISTS products.stock
(
    product_id uuid,
    count integer DEFAULT 0,
    CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products.product(id) ON DELETE CASCADE ON UPDATE CASCADE
);
