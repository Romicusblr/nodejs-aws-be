import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const sql = `
    TRUNCATE TABLE rs.stocks CASCADE;
    TRUNCATE TABLE rs.products CASCADE;

    INSERT INTO rs.products (id, title, description, price) VALUES
    ('11111111-2222-3333-4444-555555555555', 'DJI Air 2S','With a 1-inch sensor, 5.4K video, MasterShots, and much more, DJI Air 2S is the ultimate all-in-one camera drone', 1029),
    ('22222222-2222-3333-4444-555555555555', 'DJI Mini 2','Small but mighty, DJI Mini 2 features 4K videos, 4x Zoom, and stunning panoramas, allowing you to explore a whole new perspective', 469),
    ('33333333-2222-3333-4444-555555555555', 'Mavic Air 2','Mavic Air 2 takes power and portability to the next level, offering advanced features in a compact form factor', 849),
    ('44444444-2222-3333-4444-555555555555', 'Mavic Mini', 'The compact yet powerful Mavic Mini is the perfect creative companion that effortlessly elevates the ordinary.', 399),
    ('55555555-2222-3333-4444-555555555555', 'Mavic 2', 'The Mavic 2 offers iconic Hasselblad image quality on the Pro and a high-performance zoom lens on the Zoom', 1999);

    INSERT INTO rs.stocks (product_id, count) VALUES
    ('11111111-2222-3333-4444-555555555555', 3),
    ('22222222-2222-3333-4444-555555555555', 5),
    ('33333333-2222-3333-4444-555555555555', 7),
    ('44444444-2222-3333-4444-555555555555', 4),
    ('55555555-2222-3333-4444-555555555555', 6);
    `;
  await knex.raw(sql);
}
