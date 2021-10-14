import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import createError from "http-errors";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { authorizationToken, methodArn } = event;
    const effect = authorizationToken ? "Deny" : "Allow";
    const policy = generatePolicy(effect, methodArn);
    return formatJSONResponse({ policy });
  } catch (err) {
    console.log(err);
    return formatJSONResponse(createError(500));
  }
};

function generatePolicy(effect, resource) {
  return {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: effect,
        Action: ["execute-api:Execution-operation"],
        Resource: [resource],
      },
    ],
  };
}

export const main = middyfy(handler, schema);
