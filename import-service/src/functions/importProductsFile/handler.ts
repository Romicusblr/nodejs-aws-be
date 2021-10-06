import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import createError from "http-errors";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from "@libs/config";

import schema from "./schema";
const client = new S3Client({});

export const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const name = event?.queryStringParameters?.name;

    const putObjectParams = {
      Bucket: config.aws.bucketName,
      Key: config.app.uploadFolder + name,
      ContentType: "text/csv",
    };

    const command = new PutObjectCommand(putObjectParams);
    const url = await getSignedUrl(client, command);
    return formatJSONResponse({ url });
  } catch (err) {
    console.log(err);
    return formatJSONResponse(createError(500));
  }
};

export const main = middyfy(handler, schema);
