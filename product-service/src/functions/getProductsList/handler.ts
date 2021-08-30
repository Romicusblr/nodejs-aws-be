import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import productDAO from "@daos/product";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const productList = await productDAO.getAllProducts();
  return formatJSONResponse({ productList });
};

export const main = middyfy(handler);
