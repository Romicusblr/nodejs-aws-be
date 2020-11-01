import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
// commonjs import for jest importing
const productList = require("./productList.json");

const getProductById: APIGatewayProxyHandler = async (event) => {
  const productId = event?.pathParameters?.productId;
  return {
    statusCode: 200,
    body: JSON.stringify(productList.find(({ id }) => id === productId)),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};

export default getProductById;
