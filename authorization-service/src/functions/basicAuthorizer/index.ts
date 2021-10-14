import { handlerPath } from "@libs/handlerResolver";
import type { AWS } from "@serverless/typescript";
// import schema from "./schema";

const functionConfig: AWS["functions"][""] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
};

export default functionConfig;
