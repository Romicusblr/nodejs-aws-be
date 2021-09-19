import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import createError from "http-errors";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const name = event?.queryStringParameters?.name;
    return formatJSONResponse({  });
  } catch (err) {
    console.log(err);
    return formatJSONResponse(createError(500));
  }
};

export const main = middyfy(handler, schema);
