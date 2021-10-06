import "source-map-support/register";

import type { SQSEvent, Handler } from "aws-lambda";
// import { middyfy } from "@libs/lambda";
import DBTransactionDAO from "@daos/db_transaction";
import { StocksDBInitializer, ProductsDBInitializer } from "@models/db";
import {
  SNSClient,
  PublishCommand,
  MessageAttributeValue,
} from "@aws-sdk/client-sns";

const snsClient = new SNSClient({});
const topicArn = process.env.CREATE_PRODUCT_TOPIC_ARN;

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

      if (productCreated) {
        const command = new PublishCommand({
          TopicArn: topicArn,
          Message: "new product is created",
          MessageAttributes: {
            count: {
              DataType: "Number",
              StringValue: String(productCreated.count),
            },
          },
        });
        await snsClient.send(command);
        console.log("message sent successfully");
      }
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
