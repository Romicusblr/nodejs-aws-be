import type { AWS } from "@serverless/typescript";
import dotenv from "dotenv";
dotenv.config();

import { basicAuthorizer } from "@functions/index";
const { USERNAME, PASSWORD } = process.env;

const serverlessConfiguration: AWS = {
  service: "rs-app-auth-service",
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
      USERNAME,
      PASSWORD
    },
    lambdaHashingVersion: "20201221",
  },
  functions: { basicAuthorizer },
};

module.exports = serverlessConfiguration;
