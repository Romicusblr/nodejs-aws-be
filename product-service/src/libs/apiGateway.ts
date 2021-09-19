import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<
  APIGatewayProxyEvent,
  "body" | "pathParameters" | "queryStringParameters"
> &
  FromSchema<S>;

export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

type JSONResponse = {
  statusCode: number,
  body: string,
}

export const formatJSONResponse = (response: Record<string, unknown>): JSONResponse => {
  let statusCode = 200;
  if (response instanceof Error) {
    statusCode = (response.statusCode as number) ?? 500;
  }

  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
