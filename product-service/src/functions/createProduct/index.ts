import { handlerPath } from "@libs/handlerResolver";
import type { AWS } from "@serverless/typescript";
import schema from "./schema";

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
        method: "post",
        cors: true,
        path: "products",
        request: {
          schemas: {
            "application/json": schema.properties.body,
          },
        },
      },
    },
  ],
};

export default functionConfig;
