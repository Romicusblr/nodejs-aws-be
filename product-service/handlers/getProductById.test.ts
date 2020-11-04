
//@ts-nocheck // dont know how to handle APIGatewayProxyHandler types
import getProductById from "./getProductById";

describe("getProductsList function", () => {
  test("returns correct object", async () => {
    const res = await getProductById({pathParameters: {productId: "0"}});
    const product = JSON.parse(res.body)
    expect(product).toMatchObject({})
  });

  test("returns undefined for wrong id", async () => {
    const res = await getProductById({pathParameters: {productId: "10"}});
    const product = res.body
    expect(product).toBeUndefined()
  });
});
