import { handlerPath } from "@libs/handlerResolver";
import type { AWS } from "@serverless/typescript";
const AUTH_STACK_NAME = process.env.AUTH_STACK_NAME;

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
              name: true,
            },
          },
        },
        authorizer: {
          arn: `\${cf:${AUTH_STACK_NAME}-\${self:provider.stage}.BasicAuthorizerLambdaFunctionQualifiedArn}`,
          resultTtlInSeconds: 300,
          type: "token"
        },
      },
    },
  ],
};

export default functionConfig;
