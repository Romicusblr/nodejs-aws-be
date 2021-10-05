import type { AWS } from "@serverless/typescript";
import dotenv from "dotenv";
dotenv.config();

import {
  getProductById,
  getProductsList,
  createProduct,
  catalogBatchProcess
} from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "rs-app-product-service",
  useDotenv: true,
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: { forceInclude: ["pg"] },
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
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { getProductById, getProductsList, createProduct, catalogBatchProcess },
  resources: {
    Resources: {
      uploadQueueDead: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: process.env.UPLOAD_QUEUE_NAME + "Dead",
        },
      },
      uploadQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: process.env.UPLOAD_QUEUE_NAME,
          RedrivePolicy: {
            deadLetterTargetArn: { "Fn::GetAtt": ["uploadQueueDead", "Arn"] },
            maxReceiveCount: 3,
          },
        },
      },
    },
    Outputs: {
      UploadQueueURL: {
        Description: "URL of the upload queue",
        Value: { Ref: "uploadQueue" },
      },
      SourceQueueARN: {
        Description: "ARN of source queue",
        Value: { "Fn::GetAtt": ["uploadQueue", "Arn"] },
      },
      DeadLetterQueueURL: {
        Description: "URL of dead-letter queue",
        Value: { Ref: "uploadQueueDead" },
      },
      DeadLetterQueueARN: {
        Description: "ARN of dead-letter queue",
        Value: { "Fn::GetAtt": ["uploadQueueDead", "Arn"] },
      },
    },
  },
};

module.exports = serverlessConfiguration;
