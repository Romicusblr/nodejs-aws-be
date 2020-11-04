//@ts-nocheck // dont know how to handle APIGatewayProxyHandler types
import getProductsList from "./getProductsList";

describe("getProductsList function", () => {
  test("returns correct array", async () => {
    const res = await getProductsList();
    const products = JSON.parse(res.body)
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBe(8);
  });
});
