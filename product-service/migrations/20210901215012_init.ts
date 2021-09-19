import {Knex} from "knex";

export async function up(knex: Knex): Promise<void> {
  const sql = `
  CREATE SCHEMA IF NOT EXISTS rs;

  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE products (
    id uuid primary key default uuid_generate_v4(),
    title text not null check (char_length(title) <= 64),
    description text check (char_length(description) <= 255),
    price integer check (price >= 0)
  );

  CREATE TABLE stocks (
    id uuid primary key default uuid_generate_v4(),
    product_id uuid not null references products (id) on delete cascade on update cascade,
    count integer check (count >= 0)
  );
  `;
  await knex.raw(sql);
}

export async function down(knex: Knex): Promise<void> {
  const sql = `
  DROP TABLE stocks cascade;
  DROP TABLE products;
  `;
  await knex.raw(sql);
}
