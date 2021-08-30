//@ts-nocheck
import getProductById from "./handler";

describe("getProductById function", () => {
  test("returns correct object", async () => {
    const res = await getProductById({ pathParameters: { productId: "0" } });
    const product = JSON.parse(res.body);
    expect(product).toMatchObject({});
  });

  test("throws error for wrong id", async () => {
    await expect(
      getProductById({ pathParameters: { productId: "10" } })
    ).rejects.toThrow();
  });
});
