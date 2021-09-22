import "source-map-support/register";
import csv from "csv-parser";

import { middyfy } from "@libs/lambda";
import {
  S3Client,
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectCommandOutput,
} from "@aws-sdk/client-s3";
import type { S3Event, Handler } from "aws-lambda";
import schema from "./schema";
const client = new S3Client({});

const handler: Handler<S3Event> = async (event) => {
  try {
    for (const record of event?.Records) {
      const bucket = record.s3.bucket.name;
      const key = record.s3.object.key;
      const action = record.eventName;
      console.dir({ bucket, key, action });

      if (action === "ObjectCreated:Put") {
        const params = new GetObjectCommand({
          Bucket: bucket,
          Key: key,
        });
        const res = await client.send<
          GetObjectCommandInput,
          GetObjectCommandOutput
        >(params);
        res.Body.pipe(csv()).on("data", (data) => console.log(data));
      }
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const main = middyfy(handler, schema);
