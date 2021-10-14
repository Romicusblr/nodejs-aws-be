import "source-map-support/register";

import { middyfy } from "@libs/lambda";
import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerHandler,
} from "aws-lambda";

const { USERNAME, PASSWORD } = process.env;
import schema from "./schema";

const handler: APIGatewayTokenAuthorizerHandler = async (event) => {
  const { authorizationToken, methodArn } = event;
  let effect = "Deny";
  let principalId;
  try {
    const credsB64 = authorizationToken.split(" ")[1];
    const [user, pass] = Buffer.from(credsB64, "base64")
      .toString("utf-8")
      .split(":");

    console.dir({ user, pass, USERNAME, PASSWORD });
    principalId = user;

    if (user === USERNAME && pass === PASSWORD) {
      effect = "Allow";
      console.dir({ effect });
    }
  } catch (err) {
    console.log(err);
  }
  const policy = generatePolicy(principalId, effect, methodArn);
  return policy;
};

function generatePolicy(user, effect, resource): APIGatewayAuthorizerResult {
  return {
    principalId: user,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: effect,
          Action: "execute-api:Invoke",
          Resource: resource,
        },
      ],
    },
  };
}

export const main = middyfy(handler, schema);
