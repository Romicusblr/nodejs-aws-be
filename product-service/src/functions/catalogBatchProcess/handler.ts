import "source-map-support/register";

import type { SQSEvent, Handler } from "aws-lambda";
// import { middyfy } from "@libs/lambda";
import DBTransactionDAO from "@daos/db_transaction";
import { StocksDBInitializer, ProductsDBInitializer } from "@models/db";
// import schema from "./schema";

type Data = StocksDBInitializer & ProductsDBInitializer;

const handler: Handler<SQSEvent> = async (event) => {
  let dao: DBTransactionDAO;
  try {
    dao = new DBTransactionDAO();
    for (const record of event.Records) {
      console.log("record", record);
      const data: Data = JSON.parse(record.body);
      console.log("data", data);
      const productCreated = await dao.createProduct(data);
      console.log("productCreated", productCreated);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    dao.client.destroy();
  }
};

export const main = handler;
