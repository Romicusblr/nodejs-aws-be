import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import productList from "./productList.json";

const getProductsList: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(productList),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};

export default getProductsList;