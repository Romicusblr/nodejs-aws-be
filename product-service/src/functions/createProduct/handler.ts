import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import DBTransactionDAO from "@daos/db_transaction";
import createError from "http-errors";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let dao: DBTransactionDAO;
  try {
    dao = new DBTransactionDAO();
    const product = event.body;
    const productList = await dao.createProduct(product);
    return formatJSONResponse({ productList });
  } catch (err) {
    console.log(err);
    return formatJSONResponse(createError(500));
  } finally {
    dao.client.destroy();
  }
};

export const main = middyfy(handler, schema);
