import "source-map-support/register";
import csv from "csv-parser";
import { middyfy } from "@libs/lambda";
import {
  S3Client,
  GetObjectCommand,
  CopyObjectCommand,
  CopyObjectCommandInput,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {
  SQSClient,
  SendMessageBatchCommand,
  SendMessageBatchRequestEntry,
} from "@aws-sdk/client-sqs";
import type { S3Event, Handler } from "aws-lambda";
import config from "@libs/config";
import schema from "./schema";

const client = new S3Client({});
const sqsClient = new SQSClient({});

function getParsedKey(key) {
  return key.replace(config.app.uploadFolder, config.app.parsedFolder);
}

const queueUrl = process.env.UPLOAD_QUEUE_URL;

function createQueueMessage(data: {
  title: string;
  description: string;
  count: string;
  price: string;
}): SendMessageBatchRequestEntry {
  const { title, description, count, price } = data || {};
  if (title && count) {
    return {
      Id: undefined,
      MessageBody: JSON.stringify({ title, description, count, price }),
    };
  }
}

const handler: Handler<S3Event> = async (event) => {
  try {
    for (const record of event?.Records) {
      const bucket = record.s3.bucket.name;
      const key = record.s3.object.key;
      const action = record.eventName;
      console.dir({ bucket, key, action });

      const params = {
        Bucket: bucket,
        Key: key,
      };

      const res = await client.send(new GetObjectCommand(params));

      const entries: SendMessageBatchRequestEntry[] = [];
      await new Promise((resolve, reject) => {
        res.Body.pipe(csv())
          .on("data", (data) => {
            console.log(data);
            const msg = createQueueMessage(data);
            if (msg) entries.push(msg);
          })
          .on("error", reject)
          .on("end", resolve);
      });

      const destKey = getParsedKey(key);

      const copyParams: CopyObjectCommandInput = {
        Bucket: bucket,
        Key: destKey,
        CopySource: `${bucket}/${key}`,
      };

      await client.send(new CopyObjectCommand(copyParams));
      console.log("file %s copied to %s", key, destKey);

      await client.send(new DeleteObjectCommand(params));
      console.log("file %s deleted", key);

      console.dir({entries});
      if (entries.length) {
        const command = new SendMessageBatchCommand({
          Entries: entries.map((v, i) => ({ ...v, Id: String(i) })),
          QueueUrl: queueUrl,
        });
        await sqsClient.send(command);
      }
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const main = middyfy(handler, schema);
