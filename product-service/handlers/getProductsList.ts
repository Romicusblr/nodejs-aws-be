import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
// commonjs import for jest importing
const productList = require("./productList.json");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

const getProductsList: APIGatewayProxyHandler = async () => {
  try {
    const res = {
      statusCode: 200,
      body: JSON.stringify(productList),
      headers,
    };
    return res;
  } catch (e) {
    console.log("getProductsList:APIGatewayProxyHandler error", e);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    };
  }
};

export default getProductsList;
