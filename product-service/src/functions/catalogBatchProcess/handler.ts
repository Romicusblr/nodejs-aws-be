import "source-map-support/register";

import type {
  SQSEvent,
  Handler,
} from "aws-lambda";
// import { middyfy } from "@libs/lambda";
import DBTransactionDAO from "@daos/db_transaction";

// import schema from "./schema";

const handler: Handler<SQSEvent> = async (event) => {
  let dao: DBTransactionDAO;
  try {
    dao = new DBTransactionDAO();
    console.log(event);
    // const productList = await dao.createProduct(product);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    dao.client.destroy();
  }
};

export const main = handler;
