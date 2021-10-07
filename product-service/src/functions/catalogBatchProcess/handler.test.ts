import { createEvent } from "@libs/test/sqs";

const createProductMock = jest.fn();
const sendMock = jest.fn();

jest.mock("@daos/db_transaction", () => {
  return jest.fn().mockImplementation(() => {
    return {
      createProduct: createProductMock,
    };
  });
});

jest.mock("@aws-sdk/client-sns", () => {
  return {
    SNSClient: jest.fn().mockImplementation(() => {
      return {
        send: sendMock,
      };
    }),
    PublishCommand: jest.fn(),
  };
});

import DBTransactionDAO from "@daos/db_transaction";
import { handler } from "./handler";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("catalogBatchProcess function", () => {
  test("successfully create product and send message", async () => {
    const event = createEvent({ body: "{}" });
    createProductMock.mockReturnValueOnce({});
    const res = await handler(event, null, null);
    expect(res).toBe(true);
    expect(DBTransactionDAO).toHaveBeenCalledTimes(1);
    expect(createProductMock).toHaveBeenCalledTimes(1);
    expect(createProductMock).toHaveBeenCalledWith({});
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  test("do not send message when product not created", async () => {
    const event = createEvent({ body: "{}" });
    createProductMock.mockReturnValueOnce(null);
    const res = await handler(event, null, null);
    expect(res).toBe(true);
    expect(DBTransactionDAO).toHaveBeenCalledTimes(1);
    expect(createProductMock).toHaveBeenCalledTimes(1);
    expect(createProductMock).toHaveBeenCalledWith({});
    expect(sendMock).toHaveBeenCalledTimes(0);
  });

  test("return false when data is wrong json string", async () => {
    const event = createEvent({ body: "hello" });
    const res = await handler(event, null, null);
    expect(res).toBe(false);
  });
});
