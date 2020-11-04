import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
// commonjs import for jest importing
const productList = require("./productList.json");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

const getProductById: APIGatewayProxyHandler = async (event) => {
  try {
    const productId = event?.pathParameters?.productId;

    const product = productList.find(({ id }) => id === productId);

    if (!product) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Product with id ${productId} is not found`,
        }),
        headers,
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(product),
      headers,
    };
  } catch (e) {
    console.log("getProductById:APIGatewayProxyHandler error", e);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    };
  }
};

export default getProductById;
