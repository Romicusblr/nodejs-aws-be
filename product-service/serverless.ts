import type { AWS } from "@serverless/typescript";
import dotenv from "dotenv";
dotenv.config();

import { getProductById, getProductsList } from "@functions/index";

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
  functions: { getProductById, getProductsList },
};

module.exports = serverlessConfiguration;
