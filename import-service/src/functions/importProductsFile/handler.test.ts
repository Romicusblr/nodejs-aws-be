import { handler } from "./handler";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

jest.mock("@aws-sdk/client-s3");
jest.mock("@aws-sdk/s3-request-presigner");

const mockedGetSignedUrl = getSignedUrl as jest.Mock;

describe("importProductsFile function", () => {
  test("return expected url", async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      queryStringParameters: {
        a: "1",
      },
    };

    mockedGetSignedUrl.mockResolvedValue("test");

    const res = await handler(event, null, null);
    expect(res).toEqual({ statusCode: 200, body: '{"url":"test"}' });
  });
});
