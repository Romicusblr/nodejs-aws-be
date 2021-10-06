import { handlerPath } from "@libs/handlerResolver";
import type { AWS } from "@serverless/typescript";

const functionConfig: AWS["functions"][""] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        cors: true,
        path: "import",
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        }
      },
    },
  ],
};

export default functionConfig;
