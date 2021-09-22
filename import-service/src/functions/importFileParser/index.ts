import { handlerPath } from "@libs/handlerResolver";
import type { AWS } from "@serverless/typescript";
import config from "@libs/config";

const functionConfig: AWS["functions"][""] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: config.aws.bucketName,
        event: "s3:ObjectCreated:*"
      }
    },
  ],
};

export default functionConfig;
