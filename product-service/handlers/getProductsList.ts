import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import productList from "./productList.json";

const getProductsList: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(productList),
  };
};

export default getProductsList;
