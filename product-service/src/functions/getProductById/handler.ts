import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import productList from "../../productList.json";
import createError from "http-errors";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const productId = event?.pathParameters?.productId;

    const product = productList.find(({ id }) => id === productId);

    if (!product) {
      return formatJSONResponse(createError(404, `Product with id ${productId} is not found`));
    }

    return formatJSONResponse({ product });
  } catch (err) {
    return formatJSONResponse(createError(500, err.message));
  }
};

export const main = middyfy(handler);
