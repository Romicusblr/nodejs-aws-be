import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import productList from "../../productList.json";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const productId = event?.pathParameters?.productId;

  const product = productList.find(({ id }) => id === productId);

  if (!product) {
    throw new Error(`Product with id ${productId} is not found`);
  }

  return formatJSONResponse({ product });
};

export const main = middyfy(handler);
