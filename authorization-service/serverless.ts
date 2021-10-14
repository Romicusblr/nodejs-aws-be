import type { AWS } from "@serverless/typescript";
import dotenv from "dotenv";
dotenv.config();

import { basicAuthorizer } from "@functions/index";

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
    },
    lambdaHashingVersion: "20201221",
  },
  functions: { basicAuthorizer },

  // resources: {
  //   Resources: {
  //     RestApi: {
  //       Type: "AWS::ApiGateway::RestApi",
  //       Properties: {
  //         Name: "RsAuthApi",
  //       },
  //     },
  //     GatewayResponse: {
  //       Type: "AWS::ApiGateway::GatewayResponse",
  //       Properties: {
  //         ResponseParameters: {
  //           "gatewayresponse.header.WWW-Authenticate": "'Basic'",
  //         },
  //         ResponseType: "UNAUTHORIZED",
  //         RestApiId: { Ref: "RsAuthApi" },
  //         StatusCode: "401",
  //       },
  //     },
  //   },
  // },
};

module.exports = serverlessConfiguration;
