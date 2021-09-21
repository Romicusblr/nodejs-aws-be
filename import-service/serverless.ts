import type { AWS } from "@serverless/typescript";
import dotenv from "dotenv";
dotenv.config();

import {
  importProductsFile,
  importFileParser
} from "@functions/index";

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
      BUCKET_NAME: process.env.BUCKET_NAME,
    },
    lambdaHashingVersion: "20201221",
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: "s3:ListBucket",
            Resource: "arn:aws:s3:::" + process.env.BUCKET_NAME
          },
          {
            Effect: "Allow",
            Action: "s3:*",
            Resource: "arn:aws:s3:::" + process.env.BUCKET_NAME + "/*"
          }
        ]
      }
    }
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
};

module.exports = serverlessConfiguration;