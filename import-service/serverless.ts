import type { AWS } from "@serverless/typescript";
import dotenv from "dotenv";
dotenv.config();

import { importProductsFile, importFileParser } from "@functions/index";

const BUCKET_NAME = process.env.BUCKET_NAME;
const PRODUCT_STACK_NAME = process.env.PRODUCT_STACK_NAME;

const serverlessConfiguration: AWS = {
  service: "rs-app-import-service",
  useDotenv: true,
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "rs",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      BUCKET_NAME,
      UPLOAD_QUEUE_URL: `\${cf:${PRODUCT_STACK_NAME}-\${self:provider.stage}.UploadQueueURL}`,
    },
    lambdaHashingVersion: "20201221",
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: "s3:ListBucket",
            Resource: "arn:aws:s3:::" + BUCKET_NAME,
          },
          {
            Effect: "Allow",
            Action: "s3:*",
            Resource: "arn:aws:s3:::" + BUCKET_NAME + "/*",
          },
          {
            Effect: "Allow",
            Action: "sqs:SendMessage",
            Resource: `\${cf:${PRODUCT_STACK_NAME}-\${self:provider.stage}.UploadQueueARN}`,
          },
        ],
      },
    },
    s3: {
      [BUCKET_NAME]: {
        corsConfiguration: {
          CorsRules: [
            {
              AllowedHeaders: ["*"],
              AllowedMethods: ["PUT"],
              AllowedOrigins: ["*"],
            },
          ],
        },
      },
    },
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
};

module.exports = serverlessConfiguration;
