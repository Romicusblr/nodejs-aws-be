const path = require("path");
const dotenv = require("dotenv");
const {recase} = require("@kristiandupont/recase");

const env = (process.env.NODE_ENV = process.env.NODE_ENV || "development");
console.log("Using environment: ", env);

dotenv.config();

module.exports = {
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
  },

  modelNominator: v => recase("snake", "pascal")(v) + "DB",

  customTypeMap: {
    uuid: 'string',
  },

  schemas: [
    {
      name: "rs",
      ignore: ['knex_migrations', 'knex_migrations_lock'],
      modelFolder: path.join(__dirname, "src/models/db"),
    },
  ],
};
