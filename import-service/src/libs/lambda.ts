import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import inputOutputLogger from "@middy/input-output-logger";
import cors from "@middy/http-cors";
import validator from "@middy/validator";
import httpErrorHandler from "@middy/http-error-handler";
import { JSONSchema4 } from "json-schema";

export const middyfy = (handler, schema?: JSONSchema4) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(inputOutputLogger())
    .use(validator({ inputSchema: schema }))
    .use(httpErrorHandler())
    .use(cors());
};
