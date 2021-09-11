import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import ProductDAO from "@daos/product";

import schema from "./schema";
import createError from "http-errors";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  let productDAO: ProductDAO;
  try {
    const productId = event?.pathParameters?.productId;
    productDAO = new ProductDAO();
    const product = await productDAO.getWithCount(productId);

    if (!product) {
      return formatJSONResponse(
        createError(404, `Product with id ${productId} is not found`)
      );
    }

    return formatJSONResponse({ product });
  } catch (err) {
    return formatJSONResponse(createError(500, err.message));
  } finally {
    await productDAO.client.destroy();
  }
};

export const main = middyfy(handler);
