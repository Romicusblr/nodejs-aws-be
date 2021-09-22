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
import type { S3Event, Handler } from "aws-lambda";
import config from "@libs/config";
import schema from "./schema";

const client = new S3Client({});

function getParsedKey(key) {
  return key.replace(config.app.uploadFolder, config.app.parsedFolder);
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

      await new Promise((resolve, reject) => {
        res.Body.pipe(csv())
          .on("data", (data) => console.log(data))
          .on("error", reject)
          .on("end", resolve);
      });

      const copyParams: CopyObjectCommandInput = {
        Bucket: bucket,
        Key: getParsedKey(key),
        CopySource: `${bucket}/${key}`,
      };

      await client.send(new CopyObjectCommand(copyParams));

      await client.send(new DeleteObjectCommand(params));
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const main = middyfy(handler, schema);
