import { handlerPath } from "@libs/handlerResolver";
import type { AWS } from "@serverless/typescript";

const functionConfig: AWS["functions"][""] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DBNAME: process.env.DB_DBNAME,
  },
  events: [
    {
      http: {
        method: "get",
        cors: true,
        path: "products",
      },
    },
  ],
};

export default functionConfig;
