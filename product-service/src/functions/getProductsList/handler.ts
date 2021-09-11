import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import ProductDAO from "@daos/product";
import createError from "http-errors";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  let productDAO: ProductDAO;
  try {
    productDAO = new ProductDAO();
    const productList = await productDAO.searchWithCount({});
    return formatJSONResponse({ productList });
  } catch (err) {
    return formatJSONResponse(createError(500, err.message));
  } finally {
    productDAO.client.destroy();
  }
};

export const main = middyfy(handler);
