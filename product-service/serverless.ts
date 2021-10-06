import type { AWS } from "@serverless/typescript";
import dotenv from "dotenv";
dotenv.config();

import {
  getProductById,
  getProductsList,
  createProduct,
  catalogBatchProcess,
} from "@functions/index";

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_ADDRESS2 = process.env.EMAIL_ADDRESS2;
const UPLOAD_QUEUE_NAME = process.env.UPLOAD_QUEUE_NAME;

console.dir({ EMAIL_ADDRESS, EMAIL_ADDRESS2, UPLOAD_QUEUE_NAME });

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
      CREATE_PRODUCT_TOPIC_ARN: { Ref: "createProductTopic" },
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: "sns:publish",
            Resource: { Ref: "createProductTopic" },
          },
        ],
      },
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: {
    getProductById,
    getProductsList,
    createProduct,
    catalogBatchProcess,
  },
  resources: {
    Resources: {
      uploadQueueDead: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: UPLOAD_QUEUE_NAME + "Dead",
        },
      },
      uploadQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: UPLOAD_QUEUE_NAME,
          RedrivePolicy: {
            deadLetterTargetArn: { "Fn::GetAtt": ["uploadQueueDead", "Arn"] },
            maxReceiveCount: 3,
          },
        },
      },
      createProductTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          DisplayName: "createProductTopic",
        },
      },
      createProductEmailSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: EMAIL_ADDRESS,
          Protocol: "email",
          TopicArn: { Ref: "createProductTopic" },
          FilterPolicy: {
            count: [{ "anything-but": 0 }],
          },
        },
      },
      createZeroCountProductEmailSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: EMAIL_ADDRESS2,
          Protocol: "email",
          TopicArn: { Ref: "createProductTopic" },
          FilterPolicy: {
            count: [{ numeric: ["=", 0] }],
          },
        },
      },
    },
    Outputs: {
      UploadQueueURL: {
        Description: "URL of upload queue",
        Value: { Ref: "uploadQueue" },
        Export: {
          Name: { "Fn::Sub": "${AWS::StackName}-UploadQueueURL" },
        },
      },
      UploadQueueARN: {
        Description: "ARN of upload queue",
        Value: { "Fn::GetAtt": ["uploadQueue", "Arn"] },
      },
    },
  },
};

module.exports = serverlessConfiguration;
